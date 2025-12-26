
class YearDropdown {

    selectedYear
    selectionChangedListener = new EventListener(this)

    constructor() {
        this.loadYears()
    }


    loadYears = async () => {
        try {
            this.selectedYear = getCurrentYear()

            let years = (await service.getWards())
                            .map(ward => ward.Year + '')

            years.push(this.selectedYear)
            years = [...new Set(years)].sort((a, b) => a - b)

            const yearFilter = document.getElementById('year-select')
            if (yearFilter) {
                yearFilter.addEventListener('input', (e) => {
                    this.selectedYear = +e.target.value
                    this.selectionChangedListener.raise(this.selectedYear)
                    setCurrentYear(this.selectedYear)
                })

                years.forEach(year => {
                    const option = document.createElement("option");
                    option.value = year;
                    option.textContent = year;

                    if(year == this.selectedYear){
                        option.selected = true
                    }

                    yearFilter.appendChild(option);
                })
            }
        }
        catch (e) {
            console.log(e);
        }

    }

    onSelectionChanged = (callback) => {
        this.selectionChangedListener.subscribe(callback)
    }
}
