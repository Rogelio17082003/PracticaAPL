/* *
 * This sample demonstrates handling intents from an Alexa skill using the Alexa Skills Kit SDK (v2).
 * Please visit https://alexa.design/cookbook for additional examples on implementing slots, dialog management,
 * session persistence, api calls, and more.
 * */
const Alexa = require('ask-sdk-core');

// i18n dependencies. i18n is the main module, sprintf allows us to include variables with '%s'.
const i18n = require('i18next');
const sprintf = require('i18next-sprintf-postprocessor');

const languageStrings = {  
en: {
    translation: {
        WELCOME_MESSAGE: 'Hello, these are curiosities of Merida, Yucatan',
        HELLO_MESSAGE: 'Hello World...',
        DESCRIPCION: 'in a moment I will show you a video',
        LUGARES: 'in a moment I will show you the places',
        COMIDA: 'in a moment I will show you the typical foods',
        TRAJE: 'in a moment I will show you the typical costumes',
        PERSONAJES: 'Searching for Characters',
        MUSICA: 'Searching for Traditional Music',
        AYUDA: 'The possible invocations will be shown on the screen',
        ADIOS: 'Goodbye, Thank you for using our skill',
        FALLBACK_MESSAGE: 'Sorry, I don`t know about that. Please try again.',
        ERROR_MESSAGE: 'Sorry, there has been a problem. Please try again.'
    }
},  
es: {
    translation: {
        WELCOME_MESSAGE: 'Hola, estas son curiosidades de Merida, Yucatan',
        HELLO_MESSAGE: 'Hola Mundo...',
        DESCRIPCION: 'en unos momentos te mostrare un video',
        LUGARES: 'en unos momentos te mostrare los lugares',
        COMIDA: 'en unos momentos te mostrare las comidas tipicas',
        TRAJE: 'en unos momentos te mostrare los trajes tipicos',
        PERSONAJES: 'Buscando Personajes',
        MUSICA: 'Buscando Musica Tradicional',
        AYUDA: 'En pantalla se mostrara las posibles invocaciones',
        ADIOS: 'Adiós, Gracias por usar sra skill',
        FALLBACK_MESSAGE: 'Lo siento, no se nada sobre eso. Por favor inténtalo otra vez.',
        ERROR_MESSAGE: 'Lo siento, ha habido un problema. Por favor inténtalo otra vez.'
    }
}
}



const DOCUMENT_ID1 = "homeAPL";

const datasource1 = {
    "headlineTemplateData": {
        "type": "object",
        "objectId": "headlineSample",
        "properties": {
            "backgroundImage": {
                "contentDescription": null,
                "smallSourceUrl": null,
                "largeSourceUrl": null,
                "sources": [
                    {
                        "url": "https://info.promotoraresidencial.com/hubfs/comprar_casa_merida_ciudad_mas_segura_mexico.png",
                        "size": "large"
                    }
                ]
            },
            "textContent": {
                "primaryText": {
                    "type": "PlainText",
                    "text": "Bienvenido a Curiosidades de Mérida, Yucatán"
                }
            },
            "logoUrl": "",
            "hintText": "Di, \"descríbeme a merida\""
        }
    }
};

const createDirectivePayload1 = (aplDocumentId, dataSources = {}, tokenId = "documentToken") => {
    return {
        type: "Alexa.Presentation.APL.RenderDocument",
        token: tokenId,
        document: {
            type: "Link",
            src: "doc://alexa/apl/documents/" + aplDocumentId
        },
        datasources: dataSources
    }
};


const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'LaunchRequest';
    },
    handle(handlerInput) {
       
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('WELCOME_MESSAGE');
        
        if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload1(DOCUMENT_ID1, datasource1);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        }


        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};


//Descripcion de yucatan 
const DOCUMENT_IDdescripcion  = "DescripcionAPL";

const datasourceDescripcion = {
    "videoPlayerTemplateData": {
        "type": "object",
        "properties": {
            "backgroundImage": "https://images.ecestaticos.com/tVKvCclKQfYBf9BlcoRzkFmAYAc=/0x0:2121x1414/1200x675/filters:fill(white):format(jpg)/f.elconfidencial.com%2Foriginal%2Fd9e%2F66d%2F793%2Fd9e66d793adbc994841e60850a17e61c.jpg",
            "displayFullscreen": false,
            "headerTitle": "Descripción de Mérida, Yucatán",
            "headerSubtitle": "",
            "logoUrl": "",
            "videoControlType": "skip",
            "videoSources": [
                "https://robe.host8b.me/videos/video.mp4"
            ],
            "sliderType": "determinate"
        }
    }
};



//DescripcionIntent

const descripcion = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'DescripcionIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('DESCRIPCION');
        
        
         if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload1(DOCUMENT_IDdescripcion, datasourceDescripcion);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt()
            .getResponse();
    }
};


///Lugares Turisticos

const DOCUMENT_IDlugares = "lugaresAPL";

const datasourceLugares = {
    "imageListData": {
        "type": "object",
        "objectId": "imageListSample",
        "backgroundImage": {
            "contentDescription": null,
            "smallSourceUrl": null,
            "largeSourceUrl": null,
            "sources": [
                {
                    "url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTspfMSp6hRjfyR77V0XtP_8eO4GUT1dkIpjg&s",
                    "size": "large"
                }
            ]
        },
        "title": "Lugares turísticos",
        "listItems": [
            {
                "primaryText": "Plaza Grande",
                "imageSource": "data:image/jpeg;base64,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"
            },
            {
                "primaryText": "Catedral de San Ildefonso",
                "imageSource": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxy6xq2Olr2fNu99QD3ZzZeHh_xQfxDNZC5g&s"
            },
            {
                "primaryText": "Museo de Historia Natural ",
                "imageSource": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn5ogoqzSNV668PnSJKhnN6pea1-id02rxHA&s"
            },
            {
                "primaryText": "Paseo Montejo",
                "imageSource": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnlTRmCCP1EfUFdKsXRS-uBwAfKhclmIA4Gw&s"
            },
            {
                "primaryText": "Palacio Cantón",
                "imageSource": "https://www.viajefest.com/wp-content/uploads/2020/05/palacio-canton-2.png"
            },
            {
                "primaryText": "Gran Museo del Mundo Maya",
                "imageSource": "https://culturayucatanac.com.mx/wp-content/uploads/2023/02/12-El-Gran-Museo-del-Mundo-Maya-de-Merida.jpg"
            }
        ],
        "logoUrl": "",
        "hintText": ""
    }
};




//LugaresIntent

const lugares = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'LugaresIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('LUGARES');
        
         if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload1(DOCUMENT_IDlugares, datasourceLugares);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt()
            .getResponse();
    }
};




//comidaIntent

const DOCUMENT_IDcomida = "comidaAPL";

const datasourceComida = {
    "gridListData": {
        "type": "object",
        "objectId": "gridListSample",
        "backgroundImage": {
            "contentDescription": null,
            "smallSourceUrl": null,
            "largeSourceUrl": null,
            "sources": [
                {
                    "url": "https://img.freepik.com/foto-gratis/cucharas-especias-cerca-verduras_23-2147829073.jpg",
                    "size": "small",
                    "widthPixels": 0,
                    "heightPixels": 0
                },
                {
                    "url": "https://d2o906d8ln7ui1.cloudfront.net/images/templates_v3/gridlist/GridListBackground_Dark.png",
                    "size": "large",
                    "widthPixels": 0,
                    "heightPixels": 0
                }
            ]
        },
        "title": "Comidas Tipicas",
        "listItems": [
            {
                "primaryText": "Puchero",
                "imageSource": "https://media-cdn.tripadvisor.com/media/photo-s/1d/27/21/c5/tradicional-puchero-de.jpg"
            },
            {
                "primaryText": "Relleno blanco",
                "imageSource": "https://www.poresto.net/media/fotografias/m/2023/8/8/f768x1-314624_314751_79.jpg"
            },
            {
                "primaryText": "El Papak-tsul",
                "imageSource": "https://static.wixstatic.com/media/a3c131_54e52d1b13f047119b836dfdf9bab04c~mv2.jpg/v1/fill/w_780,h_530,al_c,q_85,enc_auto/a3c131_54e52d1b13f047119b836dfdf9bab04c~mv2.jpg"
            },
            {
                "primaryText": "Escabeche negro de Valladolid",
                "imageSource": "https://i.pinimg.com/originals/b1/d1/ac/b1d1acd65d287a7264e25301d51a9c59.jpg"
            },
            {
                "primaryText": "Cochinita pibil",
                "imageSource": "https://www.revistatravel.mx/images/showid/5818630"
            },
            {
                "primaryText": "Panuchos",
                "imageSource": "https://media-cdn.tripadvisor.com/media/photo-s/1d/27/0a/12/tradicionales-panuchos.jpg"
            }
        ],
        "logoUrl": ""
    }
};


const comida = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'comidaIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('COMIDA');
        
         if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload1(DOCUMENT_IDcomida, datasourceComida);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt()
            .getResponse();
    }
};



////
const DOCUMENT_IDtraje = "trajeAPL";

const datasourceTraje = {
    "detailImageRightData": {
        "type": "object",
        "objectId": "detailImageRightSample",
        "backgroundImage": {
            "contentDescription": null,
            "smallSourceUrl": null,
            "largeSourceUrl": null,
            "sources": [
                {
                    "url": "https://st2.depositphotos.com/1175677/12327/v/450/depositphotos_123277816-stock-illustration-black-wood-background-wallpaper-backdrop.jpg",
                    "size": "large"
                }
            ]
        },
        "title": "Traje Tipico",
        "subtitle": "",
        "image": {
            "contentDescription": "",
            "smallSourceUrl": null,
            "largeSourceUrl": null,
            "sources": [
                {
                    "url": "https://www.merida.gob.mx/municipio/sitiosphp/merida/cod/img/img_vaqueria.jpg",
                    "size": "large"
                }
            ]
        },
        "textContent": {
            "primaryText": {
                "type": "PlainText",
                "text": "Terno Yucateco"
            },
            "rating": {
                "text": ""
            },
            "locationText": {
                "type": "PlainText",
                "text": "Traje clásico de los mestizos varones en una camisa larga de tela blanca, finamente planchada. Un pantalón de dril o lienzo fuerte blanco, almidonado y planchado que termina en ancha boca de campana. Sandalia (alpargata) de lujo de buena piel, sujeta al tobillo con correas pespunteadas y charoladas y suela gruesa de dos o tres capas de cuero."
            },
            "secondaryText": {
                "type": "PlainText",
                "text": "El traje de la mestiza consiste en un huipil de batista de lino, de fino algodón de seda: jubón cuadrilongo que cae volante, con dos aberturas laterales que por el ancho de la prenda simulan unas mangas cortas, quedando los brazos desnudos; un amplio escote cuadrado descubre la parte de pecho, dejando desnudo el cuello. Este escote, en sus orillas, lo mismo que los bordes de la camisa, va orlado de cenefas bordadas de vivos colores, en variadísimas labores, desde el bordado de punto de cruz (xokbil-chuy) y el de seda estilo inglés, hasta el de pinturas y miniaturas al óleo. "
            }
        },
        "buttons": [
            {
                "text": ""
            },
            {
                "text": ""
            }
        ],
        "logoUrl": ""
    }
};



const traje= {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'trajeIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('TRAJE');
        
         if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload1(DOCUMENT_IDtraje, datasourceTraje);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt()
            .getResponse();
    }
};


//
const DOCUMENT_IDpersonaje = "personajesAPL";

const datasourcePersonaje = {
    "textListData": {
        "type": "object",
        "objectId": "textListSample",
        "backgroundImage": {
            "contentDescription": null,
            "smallSourceUrl": null,
            "largeSourceUrl": null,
            "sources": [
                {
                    "url": "https://st2.depositphotos.com/1175677/12327/v/450/depositphotos_123277816-stock-illustration-black-wood-background-wallpaper-backdrop.jpg",
                    "size": "large"
                }
            ]
        },
        "title": "Personajes Sobresalientes ",
        "listItems": [
            {
                "primaryText": "Eduardo Urzaiz Rodríguez"
            },
            {
                "primaryText": "Álvaro Torre Díaz"
            },
            {
                "primaryText": " José María Pino Suárez"
            },
            {
                "primaryText": "Francisco Cantón"
            },
            {
                "primaryText": " Norberto Domínguez"
            },
            {
                "primaryText": "Nicolás Cámara Vales"
            }
        ],
        "logoUrl": ""
    }
};



const personajes= {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'personajeIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('PERSONAJES');
        
         if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload1(DOCUMENT_IDpersonaje, datasourcePersonaje);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt()
            .getResponse();
    }
};





////
const DOCUMENT_IDmusica = "musicaAPL";

const datasourceMusica = {
    "audioPlayerTemplateData": {
        "type": "object",
        "properties": {
            "audioControlType": "jump30",
            "audioSources": [
                "https://robe.host8b.me/videos/Eltorito.mp3"
            ],
            "backgroundImage": "https://st2.depositphotos.com/1175677/12327/v/450/depositphotos_123277816-stock-illustration-black-wood-background-wallpaper-backdrop.jpg",
            "coverImageSource": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQms2KNLSW1TmdJ6Mj-N4r2TbbmV5p7F8sGQA&s",
            "headerTitle": "Musica  de Merida Yucatan",
            "logoUrl": "",
            "primaryText": "El Torito",
            "secondaryText": "My favourite album",
            "sliderType": "determinate"
        }
    }
};


const musica= {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'musicaIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('MUSICA');
        
         if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload1(DOCUMENT_IDmusica, datasourceMusica);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt()
            .getResponse();
    }
};


///const DOCUMENT_ID = "ayudaAPL";

const DOCUMENT_IDayuda = "ayudaAPL";

const datasourceAyuda = {
    "textListData": {
        "type": "object",
        "objectId": "textListSample",
        "backgroundImage": {
            "contentDescription": null,
            "smallSourceUrl": null,
            "largeSourceUrl": null,
            "sources": [
                {
                    "url": "https://d2o906d8ln7ui1.cloudfront.net/images/templates_v3/textlist/AlexaTextListBackground_Dark.png",
                    "size": "large"
                }
            ]
        },
        "title": "Ayuda",
        "listItems": [
            {
                "primaryText": "abre curiosidades de merida"
            },
            {
                "primaryText": "lugares turisticos"
            },
            {
                "primaryText": "describe a merida"
            },
            {
                "primaryText": "traje típico"
            },
            {
                "primaryText": "comida típica"
            },
            {
                "primaryText": "musica tradicional"
            }
        ],
        "logoUrl": ""
    }
};

const ayuda= {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('AYUDA');
        
         if (Alexa.getSupportedInterfaces(handlerInput.requestEnvelope)['Alexa.Presentation.APL']) {
            // generate the APL RenderDocument directive that will be returned from your skill
            const aplDirective = createDirectivePayload1(DOCUMENT_IDayuda, datasourceAyuda);
            // add the RenderDocument directive to the responseBuilder
            handlerInput.responseBuilder.addDirective(aplDirective);
        }

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt()
            .getResponse();
    }
};




const HelloWorldIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'HelloWorldIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('HELLO_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};



const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && (Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.CancelIntent'
                || Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('ADIOS');
      
        return handlerInput.responseBuilder
            .speak(speakOutput)
            .getResponse();
    }
};
/* *
 * FallbackIntent triggers when a customer says something that doesn’t map to any intents in your skill
 * It must also be defined in the language model (if the locale supports it)
 * This handler can be safely added but will be ingnored in locales that do not support it yet 
 * */
const FallbackIntentHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest'
            && Alexa.getIntentName(handlerInput.requestEnvelope) === 'AMAZON.FallbackIntent';
    },
    handle(handlerInput) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('FALLBACK_MESSAGE');

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};
/* *
 * SessionEndedRequest notifies that a session was ended. This handler will be triggered when a currently open 
 * session is closed for one of the following reasons: 1) The user says "exit" or "quit". 2) The user does not 
 * respond or says something that does not match an intent defined in your voice model. 3) An error occurs 
 * */
const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        console.log(`~~~~ Session ended: ${JSON.stringify(handlerInput.requestEnvelope)}`);
        // Any cleanup logic goes here.
        return handlerInput.responseBuilder.getResponse(); // notice we send an empty response
    }
};
/* *
 * The intent reflector is used for interaction model testing and debugging.
 * It will simply repeat the intent the user said. You can create custom handlers for your intents 
 * by defining them above, then also adding them to the request handler chain below 
 * */
const IntentReflectorHandler = {
    canHandle(handlerInput) {
        return Alexa.getRequestType(handlerInput.requestEnvelope) === 'IntentRequest';
    },
    handle(handlerInput) {
        const intentName = Alexa.getIntentName(handlerInput.requestEnvelope);
        const speakOutput = `You just triggered ${intentName}`;

        return handlerInput.responseBuilder
            .speak(speakOutput)
            //.reprompt('add a reprompt if you want to keep the session open for the user to respond')
            .getResponse();
    }
};
/**
 * Generic error handling to capture any syntax or routing errors. If you receive an error
 * stating the request handler chain is not found, you have not implemented a handler for
 * the intent being invoked or included it in the skill builder below 
 * */
const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        const requestAttributes = handlerInput.attributesManager.getRequestAttributes();
        const speakOutput = requestAttributes.t('ERROR_MESSAGE');
        console.log(`~~~~ Error handled: ${JSON.stringify(error)}`);

        return handlerInput.responseBuilder
            .speak(speakOutput)
            .reprompt(speakOutput)
            .getResponse();
    }
};

/**
 * This handler acts as the entry point for your skill, routing all request and response
 * payloads to the handlers above. Make sure any new handlers or interceptors you've
 * defined are included below. The order matters - they're processed top to bottom 
 * */
 
// This request interceptor will log all incoming requests to this lambda
const LoggingRequestInterceptor = {
    process(handlerInput) {
        console.log(`Incoming request: ${JSON.stringify(handlerInput.requestEnvelope.request)}`);
    }
};

// This response interceptor will log all outgoing responses of this lambda
const LoggingResponseInterceptor = {
    process(handlerInput, response) {
      console.log(`Outgoing response: ${JSON.stringify(response)}`);
    }
};

// This request interceptor will bind a translation function 't' to the requestAttributes.
const LocalizationInterceptor = {
  process(handlerInput) {
    const localizationClient = i18n.use(sprintf).init({
      lng: handlerInput.requestEnvelope.request.locale,
      fallbackLng: 'en',
      overloadTranslationOptionHandler: sprintf.overloadTranslationOptionHandler,
      resources: languageStrings,
      returnObjects: true
    });

    const attributes = handlerInput.attributesManager.getRequestAttributes();
    attributes.t = function (...args) {
      return localizationClient.t(...args);
    }
  }
}
 

exports.handler = Alexa.SkillBuilders.custom()
    .addRequestHandlers(
        LaunchRequestHandler,
        HelloWorldIntentHandler,
        descripcion,
        lugares,
        comida,
        traje,
        personajes,
        musica,
        ayuda,
        CancelAndStopIntentHandler,
        FallbackIntentHandler,
        SessionEndedRequestHandler,
        IntentReflectorHandler)
    .addErrorHandlers(
        ErrorHandler)
    .addRequestInterceptors(
        LocalizationInterceptor,
        LoggingRequestInterceptor)
    .addResponseInterceptors(
        LoggingResponseInterceptor)
    .withCustomUserAgent('sample/hello-world/v1.2')
    .lambda();
