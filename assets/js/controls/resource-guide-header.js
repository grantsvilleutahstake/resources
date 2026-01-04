let resourceGuideHeader

document.addEventListener('DOMContentLoaded', async () => {
    resourceGuideHeader = new ResourceGuideHeader()
})


class ResourceGuideHeader {

  currentPage = ''
  hamburgerNav
  mainNav

  constructor() {
    this.setCurrentPage()
    this.hamburgerNav = document.getElementById('hamburger-container')
    this.mainNav = document.getElementById('nav-container')

    this.createNavButtons()
    this.showHideNav()

    this.displayNavigationLinks()
    // window.addEventListener('resize', this.pageResized)
  }

  createNavButtons = () => {
    const openNavButton = document.getElementById('open-nav-button')
    const closeNavButton = document.getElementById('close-nav-button')

    openNavButton.addEventListener('click', this.openNavMenu)
    closeNavButton.addEventListener('click', this.closeNavMenu)
  }

  showHideNav = () => {
    if(window.innerWidth <= 800) {
      this.closeNavMenu()
    }
    else {
      this.openNavMenu()
    }
  }

  openNavMenu = () => {
      this.hamburgerNav.classList.add('hidden')
      this.mainNav.classList.remove('hidden')
  }

  closeNavMenu = () => {
      this.hamburgerNav.classList.remove('hidden')
      this.mainNav.classList.add('hidden')
  }

  setCurrentPage = () => {
    const page = window.location.pathname.split('/')
                                         .pop()
                                         .split('.')[0]
    
    this.currentPage = page
  }

  displayNavigationLinks = async () =>
  {
    const tableOfContents = await service.getTableOfContents()

    let parent = document.getElementById('nav-container')

    tableOfContents.forEach((row) => {
      if(row.Anchor == this.currentPage) {
        const div = document.createElement('div')

        div.innerText = row.Title
        div.classList.add('nav-tab')

        parent.append(div)

        return
      }

      const a = document.createElement('a')
      a.innerText = row.Title
      a.href = `${row.Anchor}.html`
      
      parent.appendChild(a)
    })

    //add data sync/refresh button
    const a = document.createElement('a')

    a.innerHTML = '&nbsp;Refresh Data'
    a.classList.add('data-refresh-link')
    a.classList.add('bi')
    a.classList.add('bi-arrow-clockwise')
    a.addEventListener('click', this.refreshData)

    parent.append(a)
  }

  refreshData = () => {
    const service = new ResourceService()
    service.clearVersions()
    location.href = location.href
  }
}