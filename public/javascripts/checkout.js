document.addEventListener(
  "DOMContentLoaded",
  () => {
    var stripe = Stripe("pk_test_51JepqlLgq45lVl8o7s42FbBEhq2DiYoPp5vov3AlARVkZvKFtclJeFLCgpQTD3Yhnf97Eg6PABg9JB15UIXgjT1w00tFQqiGgs");
    const elements = stripe.elements();
    let cardNumberElement = elements.create("cardNumber", {
      style: {
        base: {
          fontSize: "16px",
          lineHeight: "24px",
          "::placeholder": {
            color: "#6c757d",
            fontFamily: "inherit",
          },
        },
      },
      placeholder: "Numero de tarjeta",
    });
    cardNumberElement.mount("#card-number-element");
    cardNumberElement.on("change", handleError.bind(this, "cardElement"));

    let cardExpiryElement = elements.create("cardExpiry", {
      style: {
        base: {
          height: "50px",
          lineHeight: "24px",
          fontSize: "16px",
          "::placeholder": {
            color: "#6c757d",
            fontFamily: "inherit",
          },
        },
      },
      placeholder: "Expiracion de tarjeta",
    });
    cardExpiryElement.mount("#card-expiry-element");
    cardExpiryElement.on("change", handleError.bind(this, "cardExpiry"));

    let cardCvcElement = elements.create("cardCvc", {
      style: {
        base: {
          height: "100px",
          fontSize: "16px",
          lineHeight: "24px",
          "::placeholder": {
            color: "#6c757d",
            fontFamily: "inherit",
          },
        },
      },
      placeholder: "CVV",
    });
    cardCvcElement.mount("#card-cvc-element");
    cardCvcElement.on("change", handleError.bind(this, "cardCvc"));
  },
  false
);
const handleError = (element, event) => {
  if (event.error) {
    switch (element) {
      case "cardElement":
        cardError = event.error.message;
        break;
      case "cardExpiry":
        cardExpiryError = event.error.message;
        break;
      case "cardCvc":
        cardCvcError = event.error.message;
        break;
      default:
        error = "Error";
        break;
    }
  } else {
    switch (element) {
      case "cardElement":
        cardError = "";
        break;
      case "cardExpiry":
        cardExpiryError = "";
        break;
      case "cardCvc":
        cardCvcError = "";
        break;
      default:
        error = "";
        break;
    }
  }
};
const stripeTokenHandler = (token) => {
  // Insert the token ID into the form so it gets submitted to the server
  const form = document.getElementById("payment-form");
  const hiddenInput = document.createElement("input");
  hiddenInput.setAttribute("type", "hidden");
  hiddenInput.setAttribute("name", "stripeToken");
  hiddenInput.setAttribute("value", token.id);
  form.appendChild(hiddenInput);

  // Submit the form
  form.submit();
};
