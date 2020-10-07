    (() => {
      const application = Stimulus.Application.start()

      application.register("clipboard", class extends Stimulus.Controller {
        static get targets() {
          return [ "source" ]
        }

        copy(){
          event.preventDefault();
          this.sourceTarget.select();
          document.execCommand("copy");
        }

        connect(){
          if (document.queryCommandSupported("copy")){
            this.element.classList.add("clipboard--supported");
          }
        }
      });

      application.register("slideshow", class extends Stimulus.Controller {
        static get targets() {
          return [ "slide" ]
        };

        initialize() {
          this.showCurrentSlide();
          const index = parseInt(this.data.get("index"));
          this.showSlide(index);

          // Testing the Data API from Stumulis
          console.log( this.data.has("index") ) // Returns true if the Controller Ele has a Data-Slideshow-Index Attribute
          console.log( this.data.get("index") ) // returns the string value of the ele data-slideshow-index attribute
          console.log( this.data.set("index", index ) ) // sets the elements data-slideshow-index attribute to the string value of index
        };

        next() {
          let isCeiling = this.index;
          isCeiling != 3 ? this.index++ : null ;
        };

        previous() {
          let isFloor = this.index;
          isFloor != 0 ? this.index-- : null ;
        };

        showCurrentSlide(){
          this.slideTargets.forEach((el,i) => {
            el.classList.toggle("slide--current", this.index == i);
          });
        }

        get index() {
          return parseInt(this.data.get("index"));
        }

        set index(value){
          this.data.set("index", value);
          this.showCurrentSlide();
        }

        // Previous Method in the tutorial, then refactored
        showSlide(index) {
          this.index = index;
          this.slideTargets.forEach((el, i) => {
            el.classList.toggle("slide--current", index == i);
          })
        }
      });

      application.register("content-loader", class extends Stimulus.Controller {
          connect(){
              this.load();
          };

          load(){
            //   console.log(this.data.get("url"));
              const messagesURL = "../public/messages.html";
              fetch(messagesURL)
                .then(response => response.text())
                .then(html => {
                    this.element.innerHTML = html 
                })
          }
      })
    })()

// import { Application } from "stimulus"
// import { definitionsFromContext } from "stimulus/webpack-helpers"

// const application = Application.start()
// const context = require.context("./controllers", true, /\.js$/)
// application.load(definitionsFromContext(context))
