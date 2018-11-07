const DrupalAttribute = require('drupal-attribute');

module.exports = class LoomDrupalAttributes {

  static create(attributes) {
    if (Array.isArray(attributes)) return LoomDrupalAttributes.createAttribute(attributes);
    if (typeof attributes === 'object') {
      attributes = LoomDrupalAttributes.transformattributes(attributes);
      return LoomDrupalAttributes.createAttribute(attributes);
    }
    return LoomDrupalAttributes.createAttribute();
  }

  static createAttribute(attributes) {
    const drupal_attributes = new DrupalAttribute(attributes);
    drupal_attributes.twig_markup = true;
    return drupal_attributes;
  }

  static transformattributes(attributes) {
    const array = [];

    for (const name in attributes) {
      array.push([name, attributes[name]]);
    }
    return array;
  }

  static extend(templateInfo, index) {
    templateInfo.context[index].create_attribute = LoomDrupalAttributes.create;

    templateInfo.context[index].attributes = templateInfo.context[index].create_attribute(templateInfo.context[index].attributes);
  }

}
