let resourceService;

let generalInfo;
let tableOfContents;
let organizations;
let buildings;
let wards;
let presidency;
let presidencyAssignments;
let highCouncil;
let highCouncilAssignments;
let stakeConference;

document.addEventListener('DOMContentLoaded', async () => {
    resourceService = new ResourceService();

    displayGeneralInformation();
    displayTableOfContents();
    displayBuildings();
    displayPresidency();
    displayHighCouncil();
    displaySpeakingAssingments();
    displayStakeConference();
})

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// begin load data
async function loadGeneral()
{


  if(!generalInfo){
    

    let data = await resourceService.getGeneralInformation();
    const mappedData = Papa.parse(data, { header: true,  skipEmptyLines: true, dynamicTyping: true }).data;
    generalInfo = mappedData.map(row => {
      return {
        ...row,
        Value: marked.parse(row.Value)
      }
    })
  }

}

async function loadTableOfContents()
{
  if(tableOfContents) return;

  let data = await resourceService.getTableOfContents();
  tableOfContents = Papa.parse(data, { header: true,  skipEmptyLines: true, dynamicTyping: true }).data;
}

async function loadOrganizations()
{
  if(organizations) return;

  let data = await resourceService.getOrganizations();
  organizations = Papa.parse(data, { header: true,  skipEmptyLines: true, dynamicTyping: true }).data;
}

async function loadWards()
{
  if(!buildings) {
    let data = await resourceService.getBuildings();
    buildings = Papa.parse(data, { header: true,  skipEmptyLines: true, dynamicTyping: true }).data;
  }

  if(!wards) {
    data = await resourceService.getWards();
    wards = Papa.parse(data, { header: true,  skipEmptyLines: true, dynamicTyping: true }).data;
  }
}

async function loadPresidency()
{
  if(!presidency){

    let data = await resourceService.getPresidency();
    presidency = Papa.parse(data, { header: true,  skipEmptyLines: true, dynamicTyping: true }).data;
  }
  
  if(!presidencyAssignments){
    data = await resourceService.getPresidencyAssignments();
    presidencyAssignments = Papa.parse(data, { header: true,  skipEmptyLines: true, dynamicTyping: true }).data;
  }
}

async function loadHighCouncil()
{
  if(highCouncil) return;

  let data = await resourceService.getHighCouncil();
  highCouncil = Papa.parse(data, { header: true,  skipEmptyLines: true, dynamicTyping: true }).data;

  data = await resourceService.getHighCouncilAssignments();
  highCouncilAssignments = Papa.parse(data, { header: true,  skipEmptyLines: true, dynamicTyping: true }).data;
}

async function loadStakeConference()
{
  if(!stakeConference){

    let data = await resourceService.getStakeConference();
    stakeConference = Papa.parse(data, { header: true,  skipEmptyLines: true, dynamicTyping: true }).data;
  }
}
// end load data

// display
async function displayGeneralInformation()
{
  await loadGeneral();

  const titleRow = generalInfo.find(row => row.Section == 'Header' && row.Key == 'Title')

  document.getElementById('title').innerText = titleRow.Value.replace('<p>','').replace('</p>','');
}

async function displayTableOfContents()
{
  await loadTableOfContents()

  let parent = document.getElementById('toc-container')

  tableOfContents.forEach((row) => {
    const template = document.getElementById('toc-template').content.cloneNode(true);
    template.querySelector('a').innerText = row.Title;
    template.querySelector('a').href = `#${row.Anchor}`;
    template.querySelector('.section-name').innerText = `Section ${row.Section}`;

    parent.appendChild(template);
  })
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
      tmpl.querySelector('#bishop-link').innerText = ward.Bishop;
      tmpl.querySelector('#bishop-link').href = ward.BishopProfile;
      tmpl.querySelector('#high-councilor-link').innerText = hc.Name;
      tmpl.querySelector('#high-councilor-link').href = hc.Profile;
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

    displayPresidencyAssignments()

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

async function displayPresidencyAssignments()
{
  await loadPresidency()

  if ('content' in document.createElement('template')) {

    let parent = document.getElementById('presidency-assignments-container');
    let people = presidency.filter( p => p.CallingId <= 103);


    people.forEach((person) => {
      const tmpl = document.getElementById('presidency-assignments-template').content.cloneNode(true);
      let assignments = presidencyAssignments.filter(a => a.PresidentId === person.CallingId);
      let ol = tmpl.querySelector('.assignments-container');

      tmpl.querySelector('.row-header').innerText = `President ${person.Name}`;
      
      assignments.forEach(assignment => {
        const li = document.createElement('li');
        li.innerText = assignment.Assignment;
        ol.appendChild(li);
      })
      
      parent.appendChild(tmpl);
    });

  }
}
// end presidency section

async function displayHighCouncil()
{
  await loadHighCouncil();
  await loadWards();
    
  let parent = document.getElementById('high-council-container');
  let people = highCouncil.sort((a, b) => a.Seniority - b.Seniority)

  people.forEach((person) => {

    // get assignments
    let assignments = highCouncilAssignments.filter(hca => hca.HighCouncilId === person.Id)
        .map(a => a.Assignment)
        .reduce((final, current) => {
          if(final === '') return current
          return `${final}, ${current}`
        }, '');

    const homeWard = wards.find(ward => ward.Id === person.HomeWardId);
    const assignedWard = wards.find(ward => ward.HighCouncilorId === person.Id);

    if(assignedWard) assignments = `${assignedWard.Name}, ${assignments}`

    const tmpl = document.getElementById('high-council-row-template').content.cloneNode(true);
    tmpl.querySelector('a').innerText = `${person.Seniority}. ${person.Name} (${homeWard.Abbreviation})`;
    tmpl.querySelector('a').href = person.Profile;
    tmpl.querySelector('div.high-council-assignments').innerHTML = assignments;
    
    parent.appendChild(tmpl);
  });

}

async function displaySpeakingAssingments()
{
  await loadGeneral();

  const instructionsRow = generalInfo.find(info => info.Section === 'Speaking' && info.Key === 'Instructions');

  if(!instructionsRow) return;

  document.getElementById('speaking-instructions-header').innerText = instructionsRow.Key;

  const instructions = instructionsRow.Value.replace(/\r?\n/g, '<br>');
  document.getElementById('speaking-instructions').innerHTML = instructionsRow.Value;

}

async function displayStakeConference()
{
  //load instructions
  await loadGeneral();

  const instructionsRow = generalInfo.find(info => info.Section === 'Stake Conference' && info.Key === 'Instructions');

  if(!instructionsRow) return;

  document.getElementById('stake-conference-header').innerText = instructionsRow.Key;

  const instructions = instructionsRow.Value.replace(/\r?\n/g, '<br>');
  document.getElementById('stake-conference-instructions').innerHTML = instructionsRow.Value;

  // load grid
  await loadStakeConference();

  let parent = document.getElementById('stake-conference-container');

  stakeConference.forEach((row) => {

    const template = document.getElementById('stake-conference-template').content.cloneNode(true);
    template.querySelector('.stake-conference-header').innerText = row.Date;
    template.querySelector('.presiding-authority').innerText = row.Authority;
    template.querySelector('.shelley-lane').innerText = row.ShelleyLane;
    template.querySelector('.church-street').innerText = row.ChurchStreet;
    template.querySelector('.durfee').innerText = row.Chairs;
    
    parent.appendChild(template);
  });

}
