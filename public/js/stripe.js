import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51JVjO2DItxu7UQiN1QQ96IB4rOQ5gxqPXXKFQ8DZp3rsKehLkeOiKfb96mQHmiMwSvDU99jgpPRelDN5DgX3j34D00plsX5TFH'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session for API
    const session = await axios(
      `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
    );
    console.log(session);
    // 2) Create checkout from + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    showAlert('error', err);
  }
};
