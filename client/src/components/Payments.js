import React, { Component } from 'react';
import ReactStripeCheckout from 'react-stripe-checkout';
import { connect } from 'react-redux';
import * as actions from '../actions';

/*
* Stripe Checkout Button
*/
class Payments extends Component {
  render() {
    return (
      <ReactStripeCheckout
        name='Add Credits to FeeMailMe'
        description='$10 for 10 email credits.'
        // TODO Is there a way to not have this be non-editable?
        email={ this.props.email }
        // USD - Cents
        amount={1000}
        // FIXME: I don't like that amount is not shared with billing route
        // Callback returning an authorization token from Stripe representing the charge
        token={ (token) => this.props.handleToken(token) }
        // TODO: pipe token.ip into a fraud prevention API
        stripeKey={ process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY }
      ><button
        className='btn waves-effect waves-light blue lighten-2'
        title='Purchase additional credits'
      >Add Credits</button>
      </ReactStripeCheckout>
    );
  };
};

// Wire up connect helper
export default connect(null, actions)(Payments);
