'use strict';

const path = require('path');
const json5 = require('json5');
const yaml = require('js-yaml');
const toml = require('toml');
require('must');

describe('convict', function() {
  const convict = require('../');
  const schema = require('./cases/formats/schema');
  const expected_output = require('./cases/formats/out');

  describe('.loadFile()', function() {
    it('must work using default json5 parser if format isn\'t supported', function() {
      const conf = convict(schema);
      conf.loadFile(path.join(__dirname, 'cases/formats/data'));

      (function() { conf.validate() }).must.not.throw();
      conf.get().must.eql(expected_output);
    });

    it('must work with custom json parser', function() {
      convict.addParser({ formats: ['json'], parse: JSON.parse });

      const conf = convict(schema);
      conf.loadFile(path.join(__dirname, 'cases/formats/data.json'));

      (function() { conf.validate() }).must.not.throw();
      conf.get().must.eql(expected_output);
    });

    it('must work with custom json5 parser', function() {
      convict.addParser({ formats: ['json5'], parse: json5.parse });

      const conf = convict(schema);
      conf.loadFile(path.join(__dirname, 'cases/formats/data.json5'));

      (function() { conf.validate() }).must.not.throw();
      conf.get().must.eql(expected_output);
    });

    it('must work with custom yaml parser', function() {
      convict.addParser({ formats: ['yml', 'yaml'], parse: yaml.safeLoad });

      const conf = convict(schema);
      conf.loadFile(path.join(__dirname, 'cases/formats/data.yaml'));

      (function() { conf.validate() }).must.not.throw();
      conf.get().must.eql(expected_output);
    });

    it('must work with custom tom parser', function() {
      convict.addParser({ formats: ['toml'], parse: toml.parse });

      const conf = convict(schema);
      conf.loadFile(path.join(__dirname, 'cases/formats/data.toml'));

      (function() { conf.validate() }).must.not.throw();
      conf.get().must.eql(expected_output);
    });
  });
});
