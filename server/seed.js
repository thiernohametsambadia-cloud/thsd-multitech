const { sequelize, connectDB } = require('./db');
const { User, Service } = require('./models');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const seed = async () => {
  try {
    await connectDB();
    await sequelize.sync();

    const adminExists = await User.findOne({ where: { email: 'admin@thsd-multitech.com' } });
    if (!adminExists) {
      const hashed = await bcrypt.hash('admin123', 10);
      await User.create({ email: 'admin@thsd-multitech.com', password: hashed });
      console.log('Admin created: admin@thsd-multitech.com / admin123');
    } else {
      console.log('Admin already exists');
    }

    const allServices = [
      { title: 'Développement Web', description: 'Sites vitrines, applications web, e-commerce et solutions sur mesure.', icon: 'FaGlobe', sort_order: 0 },
      { title: 'Graphic Design', description: "Création d'identités visuelles, logos, chartes graphiques.", icon: 'FaPalette', sort_order: 1 },
      { title: 'Maintenance Informatique', description: 'Assistance technique, dépannage et maintenance de vos équipements.', icon: 'FaLaptopCode', sort_order: 2 },
      { title: 'Formation', description: 'Formations en développement web, design et outils numériques.', icon: 'FaChalkboardTeacher', sort_order: 3 },
      { title: 'E-commerce & Paiement Mobile', description: 'Boutiques en ligne avec intégration Orange Money, Wave et autres solutions de paiement mobile.', icon: 'FaShoppingCart', sort_order: 4 },
      { title: 'Réseau & Sécurité', description: 'Déploiement, sécurisation et maintenance de réseaux informatiques pour entreprises.', icon: 'FaShieldAlt', sort_order: 5 },
      { title: 'Marketing Digital & SEO', description: 'Stratégies de référencement, publicité en ligne et gestion des réseaux sociaux.', icon: 'FaChartLine', sort_order: 6 },
      { title: 'UI/UX Design', description: "Conception d'interfaces utilisateur modernes, intuitives et centrées sur l'expérience.", icon: 'FaFigma', sort_order: 7 },
      { title: 'Développement Mobile', description: 'Applications mobiles iOS et Android avec Flutter et React Native.', icon: 'FaMobileAlt', sort_order: 8 },
      { title: 'Hébergement & Cloud', description: "Solutions d'hébergement web, cloud computing et gestion de domaines.", icon: 'FaCloud', sort_order: 9 },
    ];
    const existing = await Service.findAll({ attributes: ['title'] });
    const existingTitles = existing.map(s => s.title);
    const toAdd = allServices.filter(s => !existingTitles.includes(s.title));
    if (toAdd.length > 0) {
      await Service.bulkCreate(toAdd);
      console.log(`Added ${toAdd.length} new service(s)`);
    } else {
      console.log('All services already exist');
    }

    console.log('Seed completed');
  } catch (err) {
    console.error('Seed error:', err);
  } finally {
    process.exit(0);
  }
};

seed();
