const sections=document.querySelectorAll('section');const navLinks=document.querySelectorAll('.nav-link');const observerOptions={threshold:0.2,rootMargin:'-100px 0px -100px 0px'};const observer=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){const id=entry.target.getAttribute('id');navLinks.forEach(link=>{link.classList.remove('active');if(link.getAttribute('href')===`#${id}`){link.classList.add('active')}})}})},observerOptions);function setInitialActiveSection(){const scrollPosition=window.scrollY+window.innerHeight/3;let currentSection=sections[0];sections.forEach(section=>{const sectionTop=section.offsetTop;if(scrollPosition>=sectionTop){currentSection=section}});const currentId=currentSection.getAttribute('id');navLinks.forEach(link=>{link.classList.remove('active');if(link.getAttribute('href')===`#${currentId}`){link.classList.add('active')}})}
document.addEventListener('DOMContentLoaded',setInitialActiveSection);document.addEventListener('scroll',setInitialActiveSection);sections.forEach(section=>observer.observe(section));const radar=document.querySelector('.radar-container');const skillPoints=document.querySelectorAll('.skill-point');function updateRadarEffects(){skillPoints.forEach(point=>{point.style.animation='pulse 2s infinite'})}
updateRadarEffects();const dataPoints=document.querySelectorAll('.data-point');function initializeRadarChart(){const radarShape=document.querySelector('.radar-shape');let isAnimating=!1;function calculateRadarPoints(){const points=[];dataPoints.forEach(point=>{const angle=parseFloat(point.style.getPropertyValue('--angle'))*Math.PI/180;const value=parseFloat(point.style.getPropertyValue('--value'));points.push({x:Math.cos(angle)*value,y:Math.sin(angle)*value})});return points}
function updateRadarShape(scale=1){const points=calculateRadarPoints();points.forEach((point,index)=>{radarShape.style.setProperty(`--p${index + 1}-x`,point.x*scale);radarShape.style.setProperty(`--p${index + 1}-y`,point.y*scale)})}
function pulseAnimation(){if(isAnimating)return;isAnimating=!0;let scale=1;const maxScale=1.1;const duration=1000;const startTime=performance.now();function animate(currentTime){const elapsed=currentTime-startTime;const progress=elapsed/duration;if(progress<1){scale=1+Math.sin(progress*Math.PI)*(maxScale-1);updateRadarShape(scale);requestAnimationFrame(animate)}else{updateRadarShape(1);isAnimating=!1}}
requestAnimationFrame(animate)}
dataPoints.forEach((point,index)=>{point.addEventListener('mouseenter',()=>{point.style.transform=`
                rotate(var(--angle)) 
                translateX(calc(260px * var(--value))) 
                rotate(calc(-1 * var(--angle)))
                scale(1.2)
            `;pulseAnimation()});point.addEventListener('mouseleave',()=>{point.style.transform=`
                rotate(var(--angle)) 
                translateX(calc(250px * var(--value))) 
                rotate(calc(-1 * var(--angle)))
            `});point.addEventListener('click',()=>{point.style.animation='none';point.offsetHeight;point.style.animation='glitch 0.3s ease'})});const radarChart=document.querySelector('.radar-chart');const radarObserver=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){dataPoints.forEach((point,index)=>{setTimeout(()=>{point.style.opacity='1';point.style.transform=`
                            rotate(var(--angle)) 
                            translateX(calc(250px * var(--value))) 
                            rotate(calc(-1 * var(--angle)))
                        `},index*200)});updateRadarShape()}})},{threshold:0.5});if(radarChart){radarObserver.observe(radarChart)}}
function initializeSkillTags(){const skillTags=document.querySelectorAll('.skill-tag');skillTags.forEach(tag=>{tag.addEventListener('mouseenter',()=>{tag.style.transform='translateY(-5px) scale(1.1)'});tag.addEventListener('mouseleave',()=>{tag.style.transform='translateY(0) scale(1)'});tag.addEventListener('click',()=>{const ripple=document.createElement('div');ripple.className='ripple';tag.appendChild(ripple);setTimeout(()=>{ripple.remove()},1000);tag.style.animation='none';tag.offsetHeight;tag.style.animation='glitch 0.3s ease'})})}
document.addEventListener('DOMContentLoaded',()=>{initializeRadarChart();initializeSkillTags()});const style=document.createElement('style');style.textContent=`
    @keyframes glitch {
        0% {
            transform: translate(0);
        }
        20% {
            transform: translate(-2px, 2px);
        }
        40% {
            transform: translate(-2px, -2px);
        }
        60% {
            transform: translate(2px, 2px);
        }
        80% {
            transform: translate(2px, -2px);
        }
        100% {
            transform: translate(0);
        }
    }

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(0, 255, 157, 0.3);
        transform: scale(0);
        animation: rippleEffect 1s linear;
        pointer-events: none;
    }

    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;document.head.appendChild(style);dataPoints.forEach(point=>{point.addEventListener('mouseenter',()=>{point.style.transform=`
            rotate(var(--angle)) 
            translateX(calc(260px * var(--value))) 
            rotate(calc(-1 * var(--angle)))
            scale(1.1)
        `});point.addEventListener('mouseleave',()=>{point.style.transform=`
            rotate(var(--angle)) 
            translateX(calc(250px * var(--value))) 
            rotate(calc(-1 * var(--angle)))
        `})});const skillTags=document.querySelectorAll('.skill-tag');skillTags.forEach(tag=>{tag.addEventListener('mouseenter',()=>{tag.style.transform='translateY(-5px)'});tag.addEventListener('mouseleave',()=>{tag.style.transform='translateY(0)'})});const gridOverlay=document.querySelector('.grid-overlay');let lastScrollY=window.scrollY;window.addEventListener('scroll',()=>{const currentScrollY=window.scrollY;const delta=(currentScrollY-lastScrollY)*0.1;gridOverlay.style.transform=`translateY(${delta}px)`;lastScrollY=currentScrollY});document.querySelectorAll('a[href^="#"]').forEach(anchor=>{anchor.addEventListener('click',function(e){e.preventDefault();const targetId=this.getAttribute('href');const targetElement=document.querySelector(targetId);if(targetElement){targetElement.scrollIntoView({behavior:'smooth',block:'start'})}})});document.addEventListener('DOMContentLoaded',()=>{initializeProjectCarousel();initRadarScanner()});function initializeProjectCarousel(){const carousel=document.querySelector('.carousel-container');if(!carousel)return;const track=document.querySelector('.carousel-track');if(!track)return;const cards=document.querySelectorAll('.project-card');const dotsContainer=document.querySelector('.carousel-dots');let currentIndex=0;let startX;let currentX;let isDragging=!1;let autoplayInterval;function createProgressBar(){if(!carousel)return;const progressContainer=document.querySelector('.carousel-progress-container');if(!progressContainer)return;const progressBar=document.createElement('div');progressBar.className='carousel-progress';progressContainer.appendChild(progressBar)}
if(track){track.addEventListener('touchstart',e=>{touchStartX=e.changedTouches[0].screenX;if(typeof stopAutoScroll==='function'){stopAutoScroll()}});track.addEventListener('touchend',e=>{touchEndX=e.changedTouches[0].screenX;if(typeof handleSwipe==='function'){handleSwipe()}
if(typeof startAutoScroll==='function'){startAutoScroll()}})}}
function initRadarScanner(){const scanner=document.querySelector('.radar-scanner');if(!scanner)return;let rotation=0;function animate(){if(!scanner)return;rotation=(rotation+1)%360;scanner.style.transform=`translate(-50%, -50%) rotate(${rotation}deg)`;requestAnimationFrame(animate)}
animate()}
document.addEventListener('DOMContentLoaded',()=>{initializeProjectCarousel()});document.addEventListener('DOMContentLoaded',()=>{const carousel=document.querySelector('.carousel-inner');const cards=document.querySelectorAll('.project-card');const prevBtn=document.querySelector('.carousel-button.prev');const nextBtn=document.querySelector('.carousel-button.next');const dots=document.querySelectorAll('.dot');let currentIndex=0;const cardWidth=cards[0].offsetWidth+32;const maxIndex=cards.length-1;function updateCarousel(){carousel.style.transform=`translateX(${-currentIndex * cardWidth}px)`;dots.forEach((dot,index)=>{dot.classList.toggle('active',index===currentIndex)});prevBtn.style.opacity=currentIndex===0?'0.5':'1';nextBtn.style.opacity=currentIndex===maxIndex?'0.5':'1'}
prevBtn.addEventListener('click',()=>{if(currentIndex>0){currentIndex--;updateCarousel()}});nextBtn.addEventListener('click',()=>{if(currentIndex<maxIndex){currentIndex++;updateCarousel()}});dots.forEach((dot,index)=>{dot.addEventListener('click',()=>{currentIndex=index;updateCarousel()})});let touchStartX=0;let touchEndX=0;carousel.addEventListener('touchstart',(e)=>{touchStartX=e.changedTouches[0].screenX});carousel.addEventListener('touchend',(e)=>{touchEndX=e.changedTouches[0].screenX;handleSwipe()});function handleSwipe(){const swipeThreshold=50;const diff=touchStartX-touchEndX;if(Math.abs(diff)>swipeThreshold){if(diff>0&&currentIndex<maxIndex){currentIndex++;updateCarousel()}else if(diff<0&&currentIndex>0){currentIndex--;updateCarousel()}}}
let autoplayInterval;function startAutoplay(){autoplayInterval=setInterval(()=>{if(currentIndex<maxIndex){currentIndex++}else{currentIndex=0}
updateCarousel()},5000)}
function stopAutoplay(){clearInterval(autoplayInterval)}
carousel.addEventListener('mouseenter',stopAutoplay);carousel.addEventListener('mouseleave',startAutoplay);updateCarousel()})
let hasPlayedSound=!1;document.addEventListener('click',(e)=>{const wave=document.createElement('div');wave.classList.add('radar-wave');wave.style.left=`${e.clientX}px`;wave.style.top=`${e.clientY}px`;document.body.appendChild(wave);const radarSound=document.getElementById('radarSound');if(radarSound&&!hasPlayedSound){radarSound.currentTime=0;radarSound.play().catch(error=>{console.warn('Unable to play radar sound:',error)});hasPlayedSound=!0}
wave.addEventListener('animationend',()=>{wave.remove()})});const skillBars=document.querySelectorAll('.skill-bar');const observerOptions2={threshold:0.5,rootMargin:"0px"};const skillsObserver=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){const progress=entry.target.querySelector('.progress');progress.style.transform='scaleX(1)'}})},observerOptions2);skillBars.forEach(bar=>skillsObserver.observe(bar));document.addEventListener('DOMContentLoaded',()=>{const track=document.querySelector('.carousel-track');if(!track)return;let touchStartX=0;let touchEndX=0;let currentIndex=0;const maxIndex=document.querySelectorAll('.project-card').length-1;track.addEventListener('touchstart',e=>{touchStartX=e.changedTouches[0].screenX});track.addEventListener('touchend',e=>{touchEndX=e.changedTouches[0].screenX;handleSwipe()});function handleSwipe(){const swipeThreshold=50;const diff=touchStartX-touchEndX;if(Math.abs(diff)>swipeThreshold){if(diff>0&&currentIndex<maxIndex){currentIndex++;updateCarousel()}else if(diff<0&&currentIndex>0){currentIndex--;updateCarousel()}}}
function updateCarousel(){if(!track)return;const offset=-currentIndex*100;track.style.transform=`translateX(${offset}%)`}});document.addEventListener('click',(e)=>{const rippleContainer=document.querySelector('.ripple-container');const ripple=document.createElement('div');const rippleCircle=document.createElement('div');ripple.className='ripple';rippleCircle.className='ripple-circle';ripple.style.left=e.clientX+'px';ripple.style.top=e.clientY+'px';ripple.appendChild(rippleCircle);rippleContainer.appendChild(ripple);rippleCircle.addEventListener('animationend',()=>{ripple.remove()})})