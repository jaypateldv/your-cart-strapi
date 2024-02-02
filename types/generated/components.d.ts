import type { Schema, Attribute } from '@strapi/strapi';

export interface CartCartItem extends Schema.Component {
  collectionName: 'components_cart_cart_items';
  info: {
    displayName: 'cartItem';
  };
  attributes: {
    quantity: Attribute.Integer;
    product: Attribute.Relation<
      'cart.cart-item',
      'oneToOne',
      'api::product.product'
    >;
  };
}

export interface UserDetailsAddress extends Schema.Component {
  collectionName: 'components_user_details_addresses';
  info: {
    displayName: 'Address';
    description: '';
  };
  attributes: {
    addressLine1: Attribute.String & Attribute.Required;
    addressLine2: Attribute.String;
    State: Attribute.String;
    City: Attribute.String;
    Pincode: Attribute.BigInteger &
      Attribute.SetMinMax<{
        min: '000000';
        max: '999999';
      }>;
    landmark: Attribute.String;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'cart.cart-item': CartCartItem;
      'user-details.address': UserDetailsAddress;
    }
  }
}
