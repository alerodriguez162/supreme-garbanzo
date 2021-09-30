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

    const form = document.getElementById("payment-form");

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const { token, error } = await stripe.createToken(cardNumberElement);

      if (!error) {
        const hiddenInput = document.createElement("input");
        hiddenInput.setAttribute("type", "hidden");
        hiddenInput.setAttribute("name", "stripeToken");
        hiddenInput.setAttribute("value", token.id);
        form.appendChild(hiddenInput);
        form.submit();
      }
    });
  },
  false
);
const handleError = (element, event) => {
  if (event.error) {
    switch (element) {
      case "cardElement":
        cardError = event.error.message;
        const containerCard = document.getElementById("card-number-element").parentNode;
        containerCard.classList.add("input-card-invalid");
        containerCard.classList.remove("input-card-valid");
        break;
      case "cardExpiry":
        cardExpiryError = event.error.message;
        const containerExp = document.getElementById("card-expiry-element").parentNode;
        containerExp.classList.add("input-card-invalid");
        containerExp.classList.remove("input-card-valid");
        break;
      case "cardCvc":
        cardCvcError = event.error.message;
        const containercvv = document.getElementById("card-cvc-element").parentNode;
        containercvv.classList.add("input-card-invalid");
        containercvv.classList.remove("input-card-valid");
        break;
      default:
        error = "Error";
        break;
    }
  } else {
    switch (element) {
      case "cardElement":
        const containerCard = document.getElementById("card-number-element").parentNode;
        containerCard.classList.remove("input-card-invalid");
        containerCard.classList.add("input-card-valid");
        break;
      case "cardExpiry":
        const containerExp = document.getElementById("card-expiry-element").parentNode;
        containerExp.classList.remove("input-card-invalid");
        containerExp.classList.add("input-card-valid");
        break;
      case "cardCvc":
        const containercvv = document.getElementById("card-cvc-element").parentNode;
        containercvv.classList.remove("input-card-invalid");
        containercvv.classList.add("input-card-valid");
        break;
      default:
        error = "";
        break;
    }
  }
};
