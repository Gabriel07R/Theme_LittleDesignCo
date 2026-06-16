  /*
redundant use of the adjustable bed element fixed later

*/

document.addEventListener('DOMContentLoaded', () => {
  const elementMessage = document.querySelector('#js-message');
  const containerDivs = document.querySelectorAll('.container');
  const cartButton = document.querySelector('.js-ajax-submit');
  const qtyButton = document.querySelector('.qty-button');
  
  

  // Colorway options
  const colorwayOptions = {
  'CLASSIC LINEN': `
    <option value="APPLE RED">APPLE RED</option>
    <option value="CALYPSO BLUE">CALYPSO BLUE</option>
    <option value="CAMEO">CAMEO</option>
    <option value="CELADON">CELADON</option>
    <option value="CHARTREUSE">CHARTREUSE</option>
    <option value="CLOVER">CLOVER</option>
    <option value="DOVE GREY">DOVE GREY</option>
    <option value="EUCALYPTUS">EUCALYPTUS</option>
    <option value="HYDRANGEA BLUE">HYDRANGEA BLUE</option>
    <option value="KELLY GREEN">KELLY GREEN</option>
    <option value="NAVY BLUE">NAVY BLUE</option>
    <option value="OLIVE">OLIVE</option>
    <option value="PEACOCK">PEACOCK</option>
    <option value="PERSIMMON">PERSIMMON</option>
    <option value="POWDER BLUE">POWDER BLUE</option>
    <option value="ROSE PINK">ROSE PINK</option>
    <option value="SMOKEY AMETHYST">SMOKEY AMETHYST</option>
    <option value="SPA BLUE">SPA BLUE</option>
    <option value="STONE">STONE</option>
    <option value="WISTERIA">WISTERIA</option>
  `,
  'MOHAIR VELVET': `
    <option value="CHARTREUSE">CHARTREUSE</option>
    <option value="BLUSH">BLUSH</option>
    <option value="BOURBON">BOURBON</option>
    <option value="CAMEL">CAMEL</option>
    <option value="CASHMERE">CASHMERE</option>
    <option value="CAVIAR">CAVIAR</option>
    <option value="DOVE GREY">DOVE GREY</option>
    <option value="EUCALYPTUS">EUCALYPTUS</option>
    <option value="GRAPHITE">GRAPHITE</option>
    <option value="MARBLE">MARBLE</option>
    <option value="NUTMEG">NUTMEG</option>
    <option value="PATINA">PATINA</option>
  `,
  'SOCIETY VELVET': `
    <option value="COGNAC">COGNAC</option>
    <option value="AEGEAN">AEGEAN</option>
    <option value="BLUSH">BLUSH</option>
    <option value="CASHMERE">CASHMERE</option>
    <option value="CELADON">CELADON</option>
    <option value="CERISE">CERISE</option>
    <option value="CERULEAN BLUE">CERULEAN BLUE</option>
    <option value="CHARCOAL">CHARCOAL</option>
    <option value="EMERALD">EMERALD</option>
    <option value="EUCALYPTUS">EUCALYPTUS</option>
    <option value="FRENCH BLUE">FRENCH BLUE</option>
    <option value="GRAPHITE">GRAPHITE</option>
    <option value="GREY">GREY</option>
    <option value="NAVY BLUE">NAVY BLUE</option>
    <option value="OLIVE">OLIVE</option>
    <option value="PEACOCK">PEACOCK</option>
    <option value="PRUSSIAN BLUE">PRUSSIAN BLUE</option>
    <option value="SABLE">SABLE</option>
    <option value="SOFT BLUE">SOFT BLUE</option>
  `,
  'SIGNATURE LINEN': `
    <option value="BONE">BONE</option>
    <option value="CAMEL">CAMEL</option>
    <option value="CAMEO">CAMEO</option>
    <option value="GREY">GREY</option>
    <option value="NAVY BLUE">NAVY BLUE</option>
    <option value="SPA BLUE">SPA BLUE</option>
  `,
  'MELROSE VELVET': `
    <option value="LAVENDER">LAVENDER</option>
    <option value="BALLET">BALLET</option>
    <option value="BLUSH">BLUSH</option>
    <option value="BONE">BONE</option>
    <option value="CERULEAN BLUE">CERULEAN BLUE</option>
    <option value="CHARTREUSE">CHARTREUSE</option>
    <option value="MIST">MIST</option>
    <option value="ROSE PINK">ROSE PINK</option>
  `,
  'STRIE VELVET': `
    <option value="ANTIQUE ROSE">ANTIQUE ROSE</option>
    <option value="BALLET">BALLET</option>
    <option value="BLUSH">BLUSH</option>
    <option value="CASHMERE">CASHMERE</option>
    <option value="CHAMBRAY">CHAMBRAY</option>
    <option value="CHESTNUT">CHESTNUT</option>
    <option value="CITRINE">CITRINE</option>
    <option value="CLOUD">CLOUD</option>
    <option value="CURRANT">CURRANT</option>
    <option value="GOLDENROD">GOLDENROD</option>
    <option value="GRAPHITE">GRAPHITE</option>
    <option value="HARBOUR BLUE">HARBOUR BLUE</option>
    <option value="JADE">JADE</option>
    <option value="MAGENTA">MAGENTA</option>
    <option value="MIST">MIST</option>
    <option value="NAVY BLUE">NAVY BLUE</option>
    <option value="OLIVE">OLIVE</option>
    <option value="OYSTER">OYSTER</option>
    <option value="PATINA">PATINA</option>
    <option value="PERIDOT">PERIDOT</option>
    <option value="RHUBARB">RHUBARB</option>
    <option value="SPA BLUE">SPA BLUE</option>
    <option value="SPANISH MOSS">SPANISH MOSS</option>
  `,
  'SIGNATURE CHENILLE': `
    <option value="JADE">JADE</option>
    <option value="SPA BLUE">SPA BLUE</option>
    <option value="MARBLE">MARBLE</option>
    <option value="STONE">STONE</option>
    <option value="CELADON">CELADON</option>
    <option value="MIST">MIST</option>
  `
  };

  // ------------------------------
  // EVENT DELEGATION
  // ------------------------------
  document.addEventListener('change', (e) => {
    const sizeElement = e.target.closest('#Option-template--16162052210768__main-0');
    const fabricElement = e.target.closest('#Option-template--16162052210768__main-2');
    const adjustableBed = e.target.closest('#adjustable-bed');
    const colorwayElement = document.querySelector('#fabric-colorway');
    const adjustableBedLabel = document.querySelector('.js-AB');
    const adjustableBedContainer = document.querySelector('.adjustable-bed-container');

    if (sizeElement) handleSizeChange(sizeElement, elementMessage, containerDivs, cartButton, qtyButton, adjustableBedLabel, adjustableBedContainer);
    if (fabricElement && colorwayElement) handleFabricChange(fabricElement, colorwayElement);
    if (adjustableBed) handleAdjustableChange(adjustableBed, elementMessage, cartButton, qtyButton, containerDivs);
  });

  // ------------------------------
  // EVENT HANDLERS
  // ------------------------------
  function handleSizeChange(sizeElement, elementMessage, containerDivs, cartButton, qtyButton, adjustableBedLabel, adjustableBedContainer) {
    const adjustableBedSelect = adjustableBedContainer.querySelector('select');


    if (sizeElement.value === `10" X 10" SAMPLE`) {
      if (adjustableBedSelect?.value === 'YES') {
        console.log("it ran");
        
        if (elementMessage) elementMessage.innerHTML = '';
        if (cartButton) {
          console.log("cart ran");
          
          cartButton.style.display = 'block';
          cartButton.classList.add("AddtoCart");
        }
        if (qtyButton) qtyButton.style.display = 'block';
      }
      if (elementMessage) elementMessage.innerHTML = '';
      if (adjustableBedLabel) adjustableBedContainer.classList.add("display-none");
      if (cartButton) {
        console.log("cart ran");
        cartButton.style.display = 'block';
        cartButton.classList.add("AddtoCart");
      }
      
      containerDivs.forEach(div => {
        div.style.display = 'none';
        div.querySelectorAll('input').forEach(input => input.value = '');
      });

      
    } else {
      if (adjustableBedLabel) {
        adjustableBedContainer.innerHTML = `
          <label class="form__label js-AB label-center">ADJUSTABLE BED</label>
          <div class="select">
            <select style="required" class="required js-variant-selector styled-select" id="adjustable-bed" name="items[0]properties[adjustable-bed]">
              <option value="NO" selected>NO</option>
              <option value="YES">YES</option>
            </select>
          </div>

        `;
      }
      if (adjustableBedLabel) adjustableBedLabel.style.display = 'block';
      if (adjustableBedLabel) adjustableBedContainer.classList.remove("display-none");
      if (elementMessage) elementMessage.innerHTML = '';
      if (qtyButton) qtyButton.style.display = 'block';
      if (cartButton) {
        cartButton.style.display = 'none';
        cartButton.classList.remove("AddtoCart");
      }
      containerDivs.forEach(div => div.style.display = 'flex');
      checkInputs();
    }

    
  }

  function handleFabricChange(fabricElement, colorwayElement) {
  
    const fabric = fabricElement.value.trim();
    if (colorwayOptions[fabric]) {
      colorwayElement.innerHTML = colorwayOptions[fabric];
    }
    //checkInputs();
  }

  function handleAdjustableChange(adjustableBed, elementMessage, cartButton, qtyButton, containerDivs) {
    if (!adjustableBed) return;

    if (adjustableBed.value === 'YES') {
      if (elementMessage)
        elementMessage.innerHTML = 'If you have an adjustable bed, please email us at custom@shoplittledesignco.com to place this order.';
      if (cartButton) {
        cartButton.style.display = 'none';
        cartButton.classList.remove("AddtoCart");
      }
      if (qtyButton) qtyButton.style.display = 'none';
      containerDivs.forEach(div => div.style.display = 'none');
    } else {
      if (elementMessage) elementMessage.innerHTML = '';
      if (qtyButton) qtyButton.style.display = 'block';
      containerDivs.forEach(div => div.style.display = 'flex');
      checkInputs();
    }
  }

  function checkInputs() {
    const sizeElement = document.querySelector('#Option-template--15738604159056__main-0');
    const adjustableBed = document.querySelector('#adjustable-bed');
    const cartButton = document.querySelector('.js-ajax-submit');
    const inputs = document.querySelectorAll('.input-holder input');
    let allAboveZero = true;

    inputs.forEach(input => {
      if (parseFloat(input.value) <= 0 || isNaN(parseFloat(input.value))) {
        allAboveZero = false;
      }
    });

    if (!cartButton) return;

    if (allAboveZero || sizeElement?.value === `10" X 10" SAMPLE`) {
      cartButton.style.display = 'block';
      cartButton.classList.add("AddtoCart");
      if (adjustableBed?.value === 'YES') {
        cartButton.style.display = 'none';
        cartButton.classList.remove("AddtoCart");
      }
    } else {
      cartButton.style.display = 'none';
      cartButton.classList.remove("AddtoCart");
    }
  }


  // React to manual input
  document.addEventListener('input', (e) => {
    if (e.target.closest('.input-holder input')) {
      checkInputs();
    }
  });

  // Initial check
  //checkInputs();
});
