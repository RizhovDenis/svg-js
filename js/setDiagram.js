function textIntoSector(idx, plotParams) {
    const { plotRadius, svgPLotSize, colors, NS, svgMiddlePoint,
        offsetTextIntoSector, coefIncreasing, porcents, areaOfSectors, areaOutSectors, arcs } = plotParams
    const title = document.createElementNS(NS, 'text')
    title.textContent = Math.ceil(procents[idx] * 10000) / 100 + " %"
    title.classList.add('text')
    title.setAttribute('x', svgMiddlePoint[0] + offsetTextIntoSector * plotRadius * Math.cos(arcs[idx]))
    title.setAttribute('y', svgMiddlePoint[1] + offsetTextIntoSector * plotRadius * Math.sin(arcs[idx]))
    return title
}


function setSectorAnimation(section, title, plotParams, offset, idx) {
    const { plotRadius, svgPLotSize, colors, NS, svgMiddlePoint,
        offsetTextIntoSector, coefIncreasing, porcents, areaOfSectors, areaOutSectors, arcs } = plotParams
    section.onmouseover = () => {
        section.style.r = (coefIncreasing * plotRadius) / 2
        section.style.strokeDasharray = coefIncreasing * areaOfSectors[idx] + " " + coefIncreasing * areaOutSectors[idx]
        section.style.strokeDashoffset = coefIncreasing * offset
        section.style.strokeWidth = coefIncreasing * plotRadius
        section.style.opacity = 0.8

        title.style.fontSize = 25
    }
    section.onmouseleave = () => {
        section.style.r = plotRadius / 2
        section.style.strokeDasharray = areaOfSectors[idx] + " " + areaOutSectors[idx]
        section.style.strokeDashoffset = offset
        section.style.strokeWidth = plotRadius
        section.style.opacity = 1

        title.style.fontSize = 20
    }
    return section
}


function setDiagram(plotParams) {
    const { plotRadius, svgPLotSize, colors, NS, svgMiddlePoint,
        offsetTextIntoSector, coefIncreasing, procents, areaOfSectors, areaOutSectors, arcs } = plotParams
    const offsets = new Array();
    let offset = 0;
    const container = document.querySelector('.container');
    const plot = document.createElementNS(NS, 'svg');
    plot.classList.add('plot');
    plot.setAttribute('width', svgPLotSize[0])
    plot.setAttribute('height', svgPLotSize[1])
    procents.forEach((procent, idx) => {
        let section = document.createElementNS(NS, 'circle');
        offsets.push(offset);
        section.classList.add('sector')
        section.setAttribute('r', plotRadius / 2)
        section.setAttribute('fill', 'none')
        section.setAttribute('cx', '50%')
        section.setAttribute('cy', '50%')
        section.setAttribute('stroke', colors[idx])
        section.setAttribute('stroke-width', plotRadius)
        section.setAttribute('stroke-dasharray', areaOfSectors[idx] + " " + areaOutSectors[idx])
        section.setAttribute('stroke-dashoffset', offset)
        plot.appendChild(section)
        if (procent >= 0.03) {
            title = textIntoSector(idx, plotParams)
            plot.appendChild(title)
        }
        section = setSectorAnimation(section, title, plotParams, offsets[idx], idx)
        offset -= Math.PI * plotRadius * procent
    })
    container.appendChild(plot)
}


function setMetaInfo(populationMillions, colors) {
    const section = document.querySelector('.meta-info');
    populationMillions.forEach((numberPeoples, idx) => {
        const svg = document.createElementNS(NS, 'svg')
        const rect = document.createElementNS(NS, 'rect')
        const continent = document.createElement('div')
        const title = document.createElement('div')
        svg.setAttribute('width', '30')
        svg.setAttribute('height', '20')
        rect.setAttribute('x', '0%')
        rect.setAttribute('y', '0%')
        rect.setAttribute('width', 30)
        rect.setAttribute('height', 20)
        rect.setAttribute('fill', colors[idx])
        continent.classList.add('continent')
        title.classList.add('title')
        title.textContent = Object.keys(numberPeoples) + " - " + Object.values(numberPeoples) + " M."
        svg.appendChild(rect)
        continent.appendChild(svg)
        continent.appendChild(title)
        section.appendChild(continent)
    })
}

setDiagram(plotParams)
setMetaInfo(populationMillions, colors)