const bcrypt = require('bcryptjs');
const seedData = require('./data.json');

class InMemoryStore {
  constructor(name, seed = []) {
    this.name = name;
    this.data = seed.map((item, i) => ({
      ...item,
      id: item.id || i + 1,
      createdAt: item.created_at || new Date().toISOString(),
      updatedAt: item.created_at || new Date().toISOString()
    }));
    this._nextId = this.data.length + 1;
  }

  _match(record, where) {
    if (!where) return true;
    return Object.entries(where).every(([key, val]) => {
      const recordVal = record[key];
      if (typeof val === 'string') {
        return String(recordVal).toLowerCase() === val.toLowerCase();
      }
      if (typeof val === 'boolean') {
        if (key === 'is_active') return record.is_active === val;
        if (key === 'is_read') return record.is_read === val;
      }
      return recordVal == val;
    });
  }

  _clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  findAll({ where, order } = {}) {
    let result = this.data.filter(r => this._match(r, where));
    if (order && order.length > 0) {
      const [field, dir] = order[0];
      result.sort((a, b) => {
        const va = a[field] || '';
        const vb = b[field] || '';
        if (dir === 'DESC') return String(vb).localeCompare(String(va));
        return String(va).localeCompare(String(vb));
      });
    }
    return Promise.resolve(result.map(r => this._wrap(r)));
  }

  findOne({ where } = {}) {
    const record = this.data.find(r => this._match(r, where));
    return Promise.resolve(record ? this._wrap(record) : null);
  }

  findByPk(id, { attributes } = {}) {
    const record = this.data.find(r => r.id == id);
    if (!record) return Promise.resolve(null);
    const wrapped = this._wrap(record);
    if (attributes) {
      const filtered = {};
      attributes.forEach(attr => { if (wrapped[attr] !== undefined) filtered[attr] = wrapped[attr]; });
      return Promise.resolve(filtered);
    }
    return Promise.resolve(wrapped);
  }

  create(data) {
    const now = new Date().toISOString();
    const record = {
      ...data,
      id: this._nextId++,
      createdAt: now,
      updatedAt: now,
      is_read: data.is_read !== undefined ? data.is_read : false,
      is_active: data.is_active !== undefined ? data.is_active : true
    };
    if (data.email) record.email = data.email.toLowerCase().trim();
    this.data.push(record);
    return Promise.resolve(this._wrap(record));
  }

  update(updates, { where } = {}) {
    this.data.forEach(r => {
      if (this._match(r, where)) {
        Object.assign(r, updates);
        r.updatedAt = new Date().toISOString();
      }
    });
    return Promise.resolve([1]);
  }

  destroy({ where } = {}) {
    const before = this.data.length;
    this.data = this.data.filter(r => !this._match(r, where));
    return Promise.resolve(before - this.data.length);
  }

  count({ where } = {}) {
    return Promise.resolve(this.data.filter(r => this._match(r, where)).length);
  }

  _wrap(record) {
    const self = this;
    return new Proxy(record, {
      get(target, prop) {
        if (prop === 'save') return () => { target.updatedAt = new Date().toISOString(); return Promise.resolve(target); };
        if (prop === 'toJSON') return () => self._clone(target);
        return target[prop];
      }
    });
  }
}

const hash = bcrypt.hashSync('admin123', 10);
const users = seedData.users && seedData.users.length > 0
  ? seedData.users.map(u => ({ ...u, password: u.password }))
  : [{ id: 1, email: 'admin@thsd-multitech.com', password: hash, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }];

const User = new InMemoryStore('User', users);
const Service = new InMemoryStore('Service', seedData.services || []);
const Message = new InMemoryStore('Message', seedData.messages || []);
const Subscriber = new InMemoryStore('Subscriber', seedData.subscribers || []);

module.exports = { User, Service, Message, Subscriber };
