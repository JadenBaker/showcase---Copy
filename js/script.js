// Skill data
const jsSkills = [
    { name: 'Vanilla', months: 38, icon: 'fa-brands fa-js' },
    { name: 'Next', months: 32 },
    { name: 'React', months: 36, icon: 'fa-brands fa-react' },
    { name: 'Node', months: 34, icon: 'fa-brands fa-node' },
    { name: 'NextAuth', months: 12 },
    { name: 'Framer Motion', months: 36 }
];

const pythonSkills = [
    { name: 'Python 3', months: 28, icon: 'fa-brands fa-python' },
    { name: 'Flask', months: 1 },
    { name: 'Pytorch', months: 1 }
];

const databaseSkills = [
    { name: 'MongoDB', months: 30, icon: 'fa-solid fa-database' },
    { name: 'Mongodb Atlas', months: 30 },
    { name: 'Mongoose', months: 3 },
    { name: 'Atlas Search', months: 9 },
    { name: 'Realm SDK', months: 9 },
    { name: 'SQL', months: 1 }
];

const cPlusPlusSkills = [
    { name: 'C++', months: 12 },
    { name: 'C', months: 3 },
    { name: 'RISC-V 64-bit assembly', months: 2, icon: 'fa-solid fa-microchip' }
];

const otherSkills = [
    { name: 'Git', months: 34, icon: 'fa solid fa-code-fork' },
    { name: 'CSS', months: 38, icon: 'fa-brands fa-css3' },
    { name: 'Github', months: 35, icon : 'fa-brands fa-github' },
    { name: 'Tailwind css', months: 28 },
    { name: 'Spline', months: 2 }
];

// Fetch APOD
async function getAPOD() {
    try {
        // const response = await fetch('https://api.nasa.gov/planetary/apod?api_key=KrYTFfefbVklFK50gg1smLLwBs1uqPNKfE8uHH4C');
        //const data = await response.json();
        const data = './assets/mountain.jpg';
        const heroSection = document.getElementById('sectionOne');
        heroSection.style.backgroundImage = `url(${data})`;
        //heroSection.style.backgroundImage = `url(${data?.hdurl || data?.url})`;
        console.log(data, 'apod date');
    } catch (error) {
        console.error('Error fetching APOD:', error);
    }
}

// Create and render skill list items
function renderSkillList(selectedList) {
    const slider = document.querySelector('.slider');
    slider.innerHTML = '';

    selectedList.forEach(skill => {
        const flipContainer = document.createElement('div');
        flipContainer.classList.add('flip-container');

        const flipper = document.createElement('div');
        flipper.classList.add('flipper');

        const front = document.createElement('div');
        front.classList.add('front');

        const skillInfo = document.createElement('div');
        skillInfo.classList.add('skill-info');

        const skillName = document.createElement('span');
        skillName.classList.add('skill-name');
        skillName.textContent = skill.name;

        skillInfo.appendChild(skillName);

        if (skill.icon) {
            const icon = document.createElement('i');
            icon.className = skill.icon;
            skillInfo.appendChild(icon);
        }

        front.appendChild(skillInfo);

        const back = document.createElement('div');
        back.classList.add('back');

        const years = Math.floor(skill.months / 12);
        const remainingMonths = skill.months % 12;
        let duration = '';
        if (years > 0) {
            duration += `${years} year${years > 1 ? 's' : ''}`;
            if (remainingMonths > 0) duration += ' and ';
        }
        if (remainingMonths > 0) {
            duration += `${remainingMonths} month${remainingMonths > 1 ? 's' : ''}`;
        }

        const experience = document.createElement('div');
        experience.classList.add('experience');
        experience.textContent = `Experience: ${duration}`;
        back.appendChild(experience);

        flipper.appendChild(front);
        flipper.appendChild(back);
        flipContainer.appendChild(flipper);

        flipContainer.addEventListener('click', () => flipContainer.classList.toggle('flipped'));

        slider.appendChild(flipContainer);
    });
}

// Switch skills function
function switchSkills(skill) {
    let selectedList;
    switch(skill) {
        case 'js': selectedList = jsSkills; break;
        case 'py': selectedList = pythonSkills; break;
        case 'db': selectedList = databaseSkills; break;
        case 'c++': selectedList = cPlusPlusSkills; break;
        case 'other': selectedList = otherSkills; break;
        default: selectedList = jsSkills;
    }
    localStorage.setItem('skillsList', skill);
    renderSkillList(selectedList);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    getAPOD();

    const storedList = localStorage.getItem('skillsList') || 'js';
    const selectElement = document.querySelector('#skillSelector');
    selectElement.value = storedList;
    switchSkills(storedList);

    selectElement.addEventListener('change', (event) => switchSkills(event.target.value));

    const leftArrow = document.getElementById('leftArrow');
    const rightArrow = document.getElementById('rightArrow');
    const slider = document.querySelector('.slider');

    leftArrow.addEventListener('click', () => slider.scrollLeft -= 200);
    rightArrow.addEventListener('click', () => slider.scrollLeft += 200);
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    const heightOfScreen = window.innerHeight;
    if (window.scrollY > heightOfScreen) header.style.opacity = 1;
    else if (window.scrollY <= heightOfScreen) header.style.opacity = 0.85;
});

const apiUrl = window.location.protocol === 'file:'
  ? 'http://localhost:8080' // Local API server during development
  : ''; // Production API

async function FetchProjects() {
    try {
        const response = await fetch(`${apiUrl}/projects`, {
            method: 'GET',
        });
        const data = await response.json();

        // Get the ul element
        const projectList = document.querySelector('#sectionThree ul');

        // Generate a project card for each row in the list
        data.forEach((project, index) => {
            const li = document.createElement('li');
            li.className = 'workWrapper';

            const isEven = index % 2 === 0;
            
            li.innerHTML = `
                <div class="upperFlex ${isEven ? '' : 'inverted'}">
                    <div class="upperFlexLeft">
                        <h4 class="title">${project[1]}</h4>
                        <p class="description">${project[2]}</p>
                        <h5>Requirements</h5>
                        <p class="requirementsList">
                            ${project[3]}
                        </p>
                    </div>
                    <div class="upperFlexRight">
                        <img src="${project[4]}" alt="Project Image" class="productImage">
                    </div>
                </div>
                <div class="lowerFlex ${isEven ? '' : 'inverted'}">
                    <div class="results">
                        <p class="resultsTitle">Results</p>
                        <p>${project[5]}</p>
                    </div>
                    <div class="technologies">
                        <p class="techTitle">Technologies Used</p>
                        <div class="client">${project[6]}</div>
                        <div class="apis">${project[7]}</div>
                        <div class="server">${project[8]}</div>
                    </div>
                </div>
            `;

            projectList.appendChild(li);
        });
    } catch (error) {
        console.error('Error fetching projects:', error);
    }
}

FetchProjects();
const moreWorksLink = document.getElementById('moreWorksLink');
moreWorksLink.addEventListener('click', () => {
    window.location.href = './works.html';
});