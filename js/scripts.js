  // document.addEventListener("contextmenu", function(e) {
  //   e.preventDefault();  // Prevent the context menu from appearing
  // });

  document.addEventListener('DOMContentLoaded', () => {
    const worksLink = document.querySelector('.works-link');
    const aboutLink = document.querySelector('.about-link');
    const nameText = document.querySelector('.name.logo');
    const projectLinks = document.querySelectorAll('.projects');
    const projectsContainer = document.querySelector('.works-container');
    const backgroundIframe = document.querySelector('.background-iframes');
    const overlayContainer = document.querySelector('.overlay-container');
    const closeButton = document.querySelector('.close-button');
    const projectTitle = document.querySelector('.project-title');
    const slideshow = document.querySelector('.slideshow');
    const projectDescription = document.querySelector('.project-description');
    const aboutContent = document.querySelector('.about-content');

    let projectLinksVisible = false; // To track whether project links are visible

    worksLink.addEventListener('click', () => {
      projectsContainer.style.visibility = 'visible';
      projectLinksVisible = true;
      aboutContent.style.display = 'none'; // Hide the about content

      // Remove the iframe element from the DOM
    if (backgroundIframe.parentNode) {
      backgroundIframe.parentNode.removeChild(backgroundIframe);
    }
    });

    aboutLink.addEventListener('click', () => {
      projectsContainer.style.visibility = 'hidden'; // Hide project links
      projectLinksVisible = false; // Set project links visibility to false
      overlayContainer.style.display = 'none';
      aboutContent.style.display = 'flex'; // Show about content
      document.body.style.overflow = ''; // Restore body scrolling

      // Remove the iframe element from the DOM
    if (backgroundIframe.parentNode) {
      backgroundIframe.parentNode.removeChild(backgroundIframe);
    }
    });

    closeButton.addEventListener('click', () => {
      projectsContainer.style.visibility = 'visible';
      aboutContent.style.display = 'none'; // Hide the about content
      overlayContainer.style.display = 'none'; // Hide the overlay
      document.body.style.overflow = ''; // Restore body scrolling
    });

    nameText.addEventListener('click', () => {
      projectsContainer.style.visibility = 'hidden';
      aboutContent.style.display = 'none'; // Hide the about content
      overlayContainer.style.display = 'none';
      document.body.style.overflow = ''; // Restore body scrolling

    // Check if the iframe is already in the DOM
    if (!document.contains(backgroundIframe)) {
      // Add the iframe element back to the DOM
      document.body.appendChild(backgroundIframe);

      // Set the display property of the iframe to 'block' or 'inline-block'
      backgroundIframe.style.display = 'grid'; // Adjust this to match your layout
    } 

    });
    
    projectLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
    
        if (!projectLinksVisible) return; // Only proceed if project links are visible
    
        const projectId = link.id;
        const projectData = getProjectData(projectId);
    
        if (projectData) {
          
          overlayContainer.style.display = 'flex';
          document.body.style.overflow = '';
    
          slideshow.innerHTML = ''; // Clear existing content
    
          if (!projectData.series) {
            // Display single project data
            const swiperContainer = document.createElement('div');
            swiperContainer.className = 'swiper-container';
            swiperContainer.innerHTML = `
              <div class="swiper-wrapper">  
                ${projectData.slideshow}
              </div>
              <div class="swiper-button-next"></div>
              <div class="swiper-button-prev"></div>
              <div class="swiper-pagination"></div>
            `;
    
            slideshow.appendChild(swiperContainer);
    
            const mySwiper = new Swiper(swiperContainer, {
              zoom: true,
              zoom: {
                maxRatio: 2,
                minRatio: 1,
              },
              pagination: {
                el: ".swiper-pagination",
                type: "bullets",
              },
              navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              },
            });
    
            if (projectData.title && projectData.description) {
              const projectTitle = document.createElement('h2');
              projectTitle.className = 'project-title';
              projectTitle.textContent = projectData.title;
    
              const projectDescription = document.createElement('p');
              projectDescription.className = 'project-description';
              projectDescription.textContent = projectData.description;
    
              slideshow.appendChild(projectTitle);
              slideshow.appendChild(projectDescription);
            }

            if (projectData.videoEmbed) {
  const videoContainer = document.createElement('div');
  videoContainer.className = 'project-video';
  videoContainer.innerHTML = projectData.videoEmbed;
  slideshow.appendChild(videoContainer);
}
          } else {
            // Series data
            if (projectData.title && projectData.description) {
              const projectSeriesTitle = document.createElement('h2');
              projectSeriesTitle.className = 'project-title';
              projectSeriesTitle.textContent = projectData.title;
    
              const projectSeriesDescription = document.createElement('p');
              projectSeriesDescription.className = 'project-description';
              projectSeriesDescription.textContent = projectData.description; 
              slideshow.appendChild(projectSeriesTitle);
              slideshow.appendChild(projectSeriesDescription);
              const horizontalRule = document.createElement('hr');
              slideshow.appendChild(horizontalRule);  
              const breakSpace = document.createElement('br');
              slideshow.appendChild(breakSpace); 
            }
    
            projectData.series.forEach((series) => {
              const seriesContainer = document.createElement('div');
              seriesContainer.className = 'series-container';
    
              const swiperContainer = document.createElement('div');
              swiperContainer.className = 'swiper-container';
              swiperContainer.innerHTML = `
                <div class="swiper-wrapper">
                  ${series.slideshow}
                </div>
                <div class="swiper-button-next"></div>
              <div class="swiper-button-prev"></div>
                <div class="swiper-pagination"></div>
              `;
    
              seriesContainer.appendChild(swiperContainer);
    
              const seriesTitle = document.createElement('h2');
              seriesTitle.className = 'project-title';
              seriesTitle.textContent = series.title;
    
              const seriesDescription = document.createElement('p');
              seriesDescription.className = 'project-description';
              seriesDescription.textContent = series.description;
    
              seriesContainer.appendChild(seriesTitle);
              seriesContainer.appendChild(seriesDescription);
    
              if (series.videoEmbed) {
    const videoContainer = document.createElement('div');
    videoContainer.className = 'project-video';
    videoContainer.innerHTML = series.videoEmbed;
    seriesContainer.appendChild(videoContainer);
  }
              slideshow.appendChild(seriesContainer);
              const horizontalRule = document.createElement('hr');
              slideshow.appendChild(horizontalRule);  
              const breakSpace = document.createElement('br');
              slideshow.appendChild(breakSpace); 
    
              const mySwiper = new Swiper(swiperContainer, {
                zoom: true,
                zoom: {
                  maxRatio: 2,
                  minRatio: 1,
                  toggle: true, // Enable zoom toggle with a single click
                },
                pagination: {
                  el: ".swiper-pagination",
                  type: "bullets",
                },
                navigation: {
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                },
              });
            });
          }
        }
      });
    });
      
    function getProjectData(projectId) {
      const projects = {
    project6: {  
      title: 'Urbanarium',
      description: 'Urbanarium is the result of the Sustentar artistic residency and was exhibited at the Bienal de Fotografia do Porto 2025. Developed in Porto, Portugal, the project explores the interplay between humans and nature in the contemporary city, reflecting on our role within natural systems and our capacity for transformation in the context of the Anthropocene. Based on the Porto BioLab initiative — a future living laboratory of urban ecology — the project examines regeneration, rebalancing, and the potential of human action to coexist harmoniously with nature. The project approaches themes of pedagogy, leisure, food, habitat, philosophy, urbanism, and ecology, revealing the city as both a stage and an active participant in this dialogue. The circular interface designed for the project fosters interaction, observation, and engagement, allowing participants to explore potential and enact transformation.',
      slideshow: (() => {
        let slides = '';
        for (let i = 1; i <= 15; i++) { // ajusta consoante o número de imagens disponíveis
          slides += `<div class="swiper-slide"><div class="swiper-zoom-container"><img src="./content/jpg/U_${i.toString().padStart(2, '0')}.jpg" alt="U_${i.toString().padStart(2, '0')}.jpg"></div></div>`;
        }
        return slides;
      })(),

      videoEmbed: `<iframe width="800" height="450" src="https://www.youtube.com/embed/07-5AWkG8Og?si=PnWnkAvDT0n3QvUu" title="Urbanarium video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`,
    
    },
      project1: {
        title: 'How to build a telescope',
        description: '‘How to Build a Telescope’ is about technology in a rural context, reflecting on the topics of curiosity and the need for invention. It also explores the complexity of science and the laws of physics, showing how they are closely related to the everyday experience of being alive. The narrative is constructed around a found book and set in a small and isolated village where technology can find its maximum expression of freedom. The project addresses the importance of reshaping the future of technology against mass production, proposing a reconnection between user, creator, and creations.The photos were taken between 2018 and 2023 and the title, directly translated from the found book, embodies the concept of a specific type of technology (a telescope) that is originally designed to be used outside noisy urban areas. The idea of building an amateur telescope evokes the juxtaposition between cosmos and mundane life. The project explores language by intentionally erasing written text from the scanned books, transforming it into an essay on the importance of visual communication in human connections.',
        slideshow: (() => {
          let slides = '';
          for (let i = 1; i <= 27; i++) {
            slides += `<div class="swiper-slide"><div class="swiper-zoom-container"><img src="./content/jpg/HTBAT_${i.toString().padStart(2, '0')}.jpg" alt="HTBAT_${i.toString().padStart(2, '0')}.jpg"></div></div>`;
          }
          return slides;
        })()
      },
      project2: {
        title: 'Rise of trivial',
        description: '‘Rise of trivial’ is a multiplatform project about virtual identity and the ways we interact in the internet.',
        series: [
          {
            title: 'Persona',
            description: '‘Persona’ series uses a term of digital marketing. It questions the platonic facet of the network: although we do not see it, we accept its existence. This creed is represented by tridimensional portraits (in the form of busts), result of the consent of individuals to be photographed in a social context. Through photogrammetric processes it was possible to collect superficial data related to their apparent identity. Seduction is present in the background’s hue of the busts, which are based on psychological strategies applied to colors used by the social platforms of the internet. ',
            slideshow: (() => {
              let slides = '';
              for (let i = 1; i <= 10; i++) {
                slides += `<div class="swiper-slide"><div class="swiper-zoom-container"><img src="./content/jpg/ROT_P_${i.toString().padStart(2, '0')}.jpg" alt="ROT_P_${i.toString().padStart(2, '0')}.jpg"></div></div>`;
              }
              return slides;
            })()
          },
          {
            title: 'ANN',
            description: '‘ANN’ stands for Artificial Neural Network. Similarly to the brain it’s a system that evolves from data analysis, following a learning method that allows the recognition of patterns. ‘ANN’ questions the learning process of new artificial intelligence. Atfer the Internet, we ceased looking for the Plato’s Eden and start building a world of forms in our own image, creating new religions such as Dataism. For what purposes are we creating these huge databases? Can we trust in computer generated data? Can we continue to talk about images as a strictly visual language? ',
            slideshow: (() => {
              let slides = '';
              for (let i = 1; i <= 5; i++) {
                slides += `<div class="swiper-slide"><div class="swiper-zoom-container"><img src="./content/jpg/ROT_ANN_${i.toString().padStart(2, '0')}.jpg" alt="ROT_ANN_${i.toString().padStart(2, '0')}.jpg"></div></div>`;
              }
              return slides;
            })(),
  videoEmbed: `<iframe width="560" height="315" src="https://www.youtube.com/embed/lZwMS1oBZYc?start=55" title="ANN video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`

          },
          {
            title: 'Backup',
            description: '‘Backup’ series reflects the concept of digital documents, not only as vehicles for information but also as testimonies of isolated uses and behaviors in a virtual scenario, using the power of duplication and making it a protocol. On one hand we have figurative representations of behavior patterns; on the other hand we have the paradigm of uncontrolled information related to our digital identity, making the “right to be forgotten on the internet” a truly utopian operation. The liberalism of the information market only leaves us with two choices: to accept everything or to enjoy nothing.',
            slideshow: (() => {
              let slides = '';
              for (let i = 1; i <= 7; i++) {
                slides += `<div class="swiper-slide"><div class="swiper-zoom-container"><img src="./content/jpg/ROT_B_${i.toString().padStart(2, '0')}.jpg" alt="ROT_B_${i.toString().padStart(2, '0')}.jpg"></div></div>`;
              }
              return slides;
            })()
          },
          {
            title: 'Non Causes',
            description: 'Non Causes’ is the materialization of paper installations created from ephemeral sculptures of books. Based on the philosophical concept of "Non-things" by Byung-Chul Han, this series explores the new values of the information market that challenge the worth of physical objects in the era of dataism.',
            slideshow: (() => {
              let slides = '';
              for (let i = 1; i <= 7; i++) {
                slides += `<div class="swiper-slide"><div class="swiper-zoom-container"><img src="./content/jpg/ROT_NC_${i.toString().padStart(2, '0')}.jpg" alt="ROT_NC_${i.toString().padStart(2, '0')}.jpg"></div></div>`;
              }
              return slides;
            })()
          },
          {
            title: 'Inscription',
            description: '‘Inscription’ is the outcome of an artistic residency held at Fórum Maia during the Bienal da Maia 2023. Over a two-week period, individuals involved in conceptualizing and producing the Contemporary Art Bienal were photographed and transformed into 3D models showcased as papercraft sculptures. Throughout the five-month duration of the Bienal, these individuals become residents of Fórum Maia, engaging in a spontaneous performance with the exhibition. Visitors can witness and interact with these individuals, broadening their perception of the sculptures and establishing connections between real individuals (through general perception), avatar representations (through this site and the mupis), and the sculptures. By participating in this project, individuals embrace an Inscription as a metaphorical expression of the everyday consent demanded by the web, joining a distinctive club associated with the Bienal.',
            slideshow: (() => {
              let slides = '';
              for (let i = 1; i <= 7; i++) {
                slides += `<div class="swiper-slide"><div class="swiper-zoom-container"><img src="./content/jpg/ROT_I_${i.toString().padStart(2, '0')}.jpg" alt="ROT_I_${i.toString().padStart(2, '0')}.jpg"></div></div>`;
              }
              return slides;
            })()
          }
        ]
      },
      project3: {
        title: 'Glad I spent it with you',
        description: 'There is no such thing as a manual on reading digital images for humans. “Glad I spent it with you” is a set of images that unveil the basic structure of a digital image. These images are the product of unintentional errors that occured with a broken storage card. Although the files were corrupted, the machine maked the effort on reading the data, producing images that denounce the reading methods of the basic units that constitutes the digital photographs we produce with our cameras. This project intends to reclaim the authorship associated with images whose initial intention of assisting memory transforms into the realization and consecration of the digital image as an ephemeral by-product of contemporary virtual culture.',
        slideshow: (() => {
          let slides = '';
          for (let i = 1; i <= 8; i++) {
            slides += `<div class="swiper-slide"><div class="swiper-zoom-container"><img src="./content/jpg/GISIWY_${i.toString().padStart(2, '0')}.jpg" alt="GISIWY_${i.toString().padStart(2, '0')}.jpg"></div></div>`;
          }
          return slides;
        })()
      },
      project4: {
        title: 'Narrow Slice',
        description: '“Isn’t the human emancipation of Nature really just an outcome of our own Nature?” ‘Narrow Slice’ is a documentary photography project that deals with the way human beings position themselves in time and space in relation to Nature. The unease caused by the ambiguity of this query proposes us to revisit the apparent reality, leading to the formulation of new questions.',
        slideshow: (() => {
          let slides = '';
          for (let i = 1; i <= 12; i++) {
            slides += `<div class="swiper-slide"><div class="swiper-zoom-container"><img src="./content/jpg/NS_${i.toString().padStart(2, '0')}.jpg" alt="NS_${i.toString().padStart(2, '0')}.jpg"></div></div>`;
          }
          return slides;
        })()
      },
      project5: {
        title: 'Collaborations',
        description: 'Some of the collaborations works I have with Ivan da Silva, Marco Duarte, Barda Collective and others.',
        series: [
          {
            title: 'Membrana',
            description: 'In collaboration with Barda Collective. ’Membrana’ is an exhibition that explores the convergence of personal and collective experiences. It’s an immersive showcase that delves into sensory adaptation and the interplay between public and private spaces. Through artful use of color, movement, and sensory elements, everyday life is deconstructed, revealing hidden layers of our reality. As you engage with the exhibition, you’re invited to question and reflect on the essence of human connection and perception.',
            slideshow: (() => {
              let slides = '';
              for (let i = 1; i <= 11; i++) {
                slides += `<div class="swiper-slide"><div class="swiper-zoom-container"><img src="./content/jpg/M_${i.toString().padStart(2, '0')}.jpg" alt="M_${i.toString().padStart(2, '0')}.jpg"></div></div>`;
              }
              return slides;
            })()
          },
          {
            title: 'PopPorn',
            description: 'In collaboration with Marco Duarte. ’PopPorn’ is an immersive art experience delving into the visual portrayal of politics in the media. This interactive installation encourages participants to explore the complexities of power, influence, and perception in the realm of TV politics. Using a mouse, visitors can uncover layers of media imagery that depict the interconnectedness of populist politics, television, and desire.',
            slideshow: (() => {
              let slides = '';
              for (let i = 1; i <= 5; i++) {
                slides += `<div class="swiper-slide"><div class="swiper-zoom-container"><img src="./content/jpg/PP_${i.toString().padStart(2, '0')}.png" alt="PP_${i.toString().padStart(2, '0')}.png"></div></div>`;
              }
              return slides;
            })()
          },
          {
            title: 'Junta Seca',
            description: 'In collaboration with Ivan da Silva. ’Junta Seca’ is an exhibition that uncovers the forgotten narratives of nomadic social spaces. Within its confines, remnants of an unnamed, unrecorded group’s history are explored and reimagined. This exhibition breathes life into discarded artifacts, offering a glimpse into the ever-shifting interplay of time, societal dynamics, and urban landscapes. ’Junta Seca’ is a journey of deterritorialization and reterritorialization, where waste finds new meaning within the city’s stone walls, revealing the untold stories of the past.',
            slideshow: (() => {
              let slides = '';
              for (let i = 1; i <= 7; i++) {
                slides += `<div class="swiper-slide"><div class="swiper-zoom-container"><img src="./content/jpg/JS_${i.toString().padStart(2, '0')}.jpg" alt="JS_${i.toString().padStart(2, '0')}.jpg"></div></div>`;
              }
              return slides;
            })()
          }
        ]
      }
    };

    return projects[projectId] || null;
  }

  const worksOffset = 0;
  const aboutOffset = 10;

  let mouseX = 0;
  let mouseY = 0;
  let time = 0;
  const speed = 0.005;

  function updateMousePosition(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;

    const skewAmount = 6;

    const skewX = (mouseX / window.innerWidth - 0.5) * skewAmount;
    const skewY = (mouseY / window.innerHeight - 0.5) * skewAmount;

    nameText.style.transform = `skew(${skewX}deg, ${skewY}deg) translateX(${skewX}px) translateY(${skewY}px)`;
  }

  document.addEventListener('mousemove', updateMousePosition);

  function animateLinks() {
    const worksXMovement = worksOffset + Math.sin(time) * 10 + mouseY / window.innerHeight * 8 - 4;
    const worksYMovement = worksOffset + Math.cos(time) * 10 + mouseX / window.innerWidth * 8 - 4;

    const aboutXMovement = aboutOffset + Math.sin(time * -1) * 6 + mouseY / window.innerHeight * 4 - 2;
    const aboutYMovement = aboutOffset + Math.cos(time) * 6 + mouseX / window.innerWidth * 4 - 2;

    worksLink.style.transform = `translateX(${worksXMovement}px) translateY(${worksYMovement}px) skewX(${worksYMovement / 2}deg) skewY(${worksXMovement / 2}deg)`;
    aboutLink.style.transform = `translateX(${aboutXMovement}px) translateY(${aboutYMovement}px) skewX(${aboutYMovement / 2}deg) skewY(${aboutXMovement / 2}deg)`;
    nameText.style.transform = `translateX(${worksXMovement}px) translateY(${worksYMovement}px)`;

    projectLinks.forEach((link, index) => {
      const projectOffset = index * 10;
      const projectXMovement = projectOffset + Math.sin(time) * 6 + mouseY / window.innerHeight * 4 - 2;
      const projectYMovement = projectOffset + Math.cos(time) * 6 + mouseX / window.innerWidth * 4 - 2;
  
        link.style.transform = `translateX(${projectXMovement}px) translateY(${projectYMovement}px) skewX(${projectYMovement / 10}deg) skewY(${projectXMovement / -4}deg)`;
    });

    time += speed;
    requestAnimationFrame(animateLinks);
  }


  animateLinks();

  const mySwiper = new Swiper('.swiper-container', {
    zoom: true,
    zoom: {
      maxRatio: 2,
      minRatio: 1,
      toggle: true,
    },
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
  });
