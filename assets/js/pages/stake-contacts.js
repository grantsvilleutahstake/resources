let contactInformationPage

document.addEventListener('DOMContentLoaded', async () => {
  contactInformationPage = new ContactInformationPage()
  
  displaySection('Stake Contacts', 'Stake Contacts', 'stake-contacts-header');
})

class ContactInformationPage {

  callings 
  highCouncilAssignments
  wards

  constructor() {
    this.init()
  }

  init = async() => {
    this.callings = await service.getCallings()
    this.highCouncilAssignments = await service.getHighCouncilAssignments();
    this.wards = await service.getWards();

    this.displayOrganizations()
  }

  displayOrganizations = async () => {
    let organizations = await service.getOrganizations()

    organizations.forEach((organization) => {

      const parent = document.getElementById('presidency')

      const template = document.getElementById('organization-contact-template').content.cloneNode(true)
      template.getElementById('organization-name').innerText = organization.Name

      const people = this.callings.filter(calling => calling.OrganizationId == organization.OrganizationId)

      switch(organization.OrganizationId) {
        case 2:
          this.renderHighCouncilRows(people, template)
          break
        case 101:
          this.renderMissinoaryRows(people, template)
          break
        default:
          this.renderCallingRows(people, template)
          break
      }
      
      parent.appendChild(template)
    })

  }

  renderCallingRows = (people, parent) => {
    people.forEach((person) => {
      const tmpl = document.getElementById('calling-row-template').content.cloneNode(true)
      tmpl.querySelector('.person-name').innerText = person.Name
      tmpl.querySelector('.person-name').href = person.Profile
      tmpl.querySelector('div.calling-container').innerHTML = person.Calling

      const table = parent.getElementById('organization-table')
      table.appendChild(tmpl)
    })
  }


  renderHighCouncilRows = async (people, tempParent) => {
    const parent = tempParent

    // sort High Council by Seniority
    people = people.sort((a, b) => a.Seniority - b.Seniority)

    people.forEach((person) => {

      // get assignments
      let assignments = this.highCouncilAssignments.filter(hca => hca.HighCouncilId === person.CallingId)
        .map(a => a.Assignment)
        .reduce((final, current) => {
          if (final === '') return current
          return `${final}, ${current}`
        }, '');

      const homeWard = this.wards.find(ward => ward.Id === person.HomeWardId);
      const assignedWard = this.wards.find(ward => ward.HighCouncilorId === person.CallingId);

      if (assignedWard) assignments = `${assignedWard.Id} Ward, ${assignments}`

      const template = document.getElementById('calling-row-template').content.cloneNode(true)


      template.querySelector('.person-name').innerText = `${person.Seniority}. ${person.Name} (${homeWard.Abbreviation})`;
      template.querySelector('.person-name').href = person.Profile
      template.querySelector('div.calling-container').innerHTML = assignments

      console.log(parent.innerHTML);
      
      const table = parent.getElementById('organization-table')
      table.appendChild(template)

      // tmpl.querySelector('a').innerText = 
      // tmpl.querySelector('a').href = person.Profile;
      // tmpl.querySelector('div.high-council-assignments').innerHTML = assignments;

      // parent.appendChild(tmpl);
    });

  }

  renderMissinoaryRows = (people, parent) => {
    people.forEach((person) => {
      const tmpl = document.getElementById('missionary-row-template').content.cloneNode(true)
      tmpl.querySelector('.person-name').innerText = person.Name
      tmpl.querySelector('div.calling-container').innerHTML = person.Calling

      const table = parent.getElementById('organization-table')
      table.appendChild(tmpl)
    })
  }

}
