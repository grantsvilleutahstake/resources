let resourceService;

let generalInfo;
let organizations;
let buildings;
let wards;
let presidency;
let presidencyAssignments;
let highCouncil;
let highCouncilAssignments;

document.addEventListener('DOMContentLoaded', async () => {
    resourceService = new ResourceService();

    displayGeneralInformation();
    displayBuildings();
    displayPresidency();
})

// begin load data
async function loadGeneral()
{
  if(generalInfo) return;

  let data = await resourceService.getGeneralInformation();
  generalInfo = Papa.parse(data, { header: true,  skipEmptyLines: true, dynamicTyping: true }).data;
}

async function loadOrganizations()
{
  if(organizations) return;

  let data = await resourceService.getOrganizations();
  organizations = Papa.parse(data, { header: true,  skipEmptyLines: true, dynamicTyping: true }).data;
}

async function loadWards()
{
  if(buildings) return;

  let data = await resourceService.getBuildings();
  buildings = Papa.parse(data, { header: true,  skipEmptyLines: true, dynamicTyping: true }).data;

  if(wards) return;

  data = await resourceService.getWards();
  wards = Papa.parse(data, { header: true,  skipEmptyLines: true, dynamicTyping: true }).data;
}


async function loadPresidency()
{
  if(presidency) return;

  let data = await resourceService.getPresidency();
  presidency = Papa.parse(data, { header: true,  skipEmptyLines: true, dynamicTyping: true }).data;
  
  data = await resourceService.getPresidencyAssignments();
  presidencyAssignments = Papa.parse(data, { header: true,  skipEmptyLines: true, dynamicTyping: true }).data;
}

async function loadHighCouncil()
{
  if(highCouncil) return;

  let data = await resourceService.getHighCouncil();
  highCouncil = Papa.parse(data, { header: true,  skipEmptyLines: true, dynamicTyping: true }).data;

  data = await resourceService.getHighCouncilAssignments();
  highCouncilAssignments = Papa.parse(data, { header: true,  skipEmptyLines: true, dynamicTyping: true }).data;
}
// end load data

// display
async function displayGeneralInformation()
{
  await loadGeneral();

  const titleRow = generalInfo.find(row => row.Section == 'Header' && row.Key == 'Title')

  document.getElementById('title').innerText = titleRow.Value;
}

// wards
async function displayBuildings()
{
  await loadWards();

  let parent = document.getElementById('buildings-container');

  if ('content' in document.createElement('template')) {
    buildings.forEach(async (building) => {
      const template = document.getElementById('building-row-template').content.cloneNode(true);
      const div = template.querySelector(".building-table");

      template.querySelector('.building-name').innerText = building.Name;
      template.querySelector('.building-description').innerText = building.Address;
      template.querySelector('.map-container').innerHTML = building.MapURL;

      const mapToggle = template.querySelector('.clickable');
      const map = template.querySelector('.map-container');

      mapToggle.addEventListener('click', () => {
        toggle(map);
      })

      displayWards(building.BuildingId, div);
      
      parent.appendChild(template);
    });
  }
}

async function displayWards(buildingId, parent)
{
  await loadHighCouncil();

  const buildingWards = wards.filter(ward => ward.BuildingId == buildingId);

  buildingWards.forEach(ward => {

      const tmpl = document.getElementById('ward-row-template').content.cloneNode(true);
      const hc = highCouncil.find(hc => hc.Id === ward.HighCouncilorId);

      tmpl.querySelector('.ward-name').innerText = ward.Abbreviation;
      tmpl.querySelector('.start-time').innerText = ward.SacramentMeeting;
      tmpl.querySelector('.bishop').innerText = ward.Bishop;
      tmpl.querySelector('.high-councilor').innerText = hc.Name;
      tmpl.querySelector('.youth-night').innerText = ward.YouthNight;

      
      parent.appendChild(tmpl);

  })

}


// presidency section
async function displayPresidency()
{
  await loadPresidency()

  if ('content' in document.createElement('template')) {

    let div = document.getElementById('presidency-container');
    let people = presidency.filter( p => p.OrganizationId == 1);
    renderPresidencyRows(people, div);

    div = document.getElementById('patriarch-container');
    people = presidency.filter( p => p.OrganizationId == 3);
    renderPresidencyRows(people, div);

    div = document.getElementById('mission-container');
    people = presidency.filter( p => p.OrganizationId == 101);
    renderPresidencyRows(people, div);

  }
}

function renderPresidencyRows(people, parent)
{
    people.forEach((person) => {
      const tmpl = document.getElementById('presidency-row-template').content.cloneNode(true);
      tmpl.querySelector('a').innerText = person.Name;
      tmpl.querySelector('a').href = person.Profile;
      tmpl.querySelector('div.calling-container').innerHTML = person.Calling;
      
      parent.appendChild(tmpl);
    });
}
// end presidency section