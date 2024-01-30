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

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'cart.cart-item': CartCartItem;
    }
  }
}
