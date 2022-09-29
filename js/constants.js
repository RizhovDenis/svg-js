const plotRadius = 250
const svgPLotSize = [800, 600]
const offsetTextIntoSector = 0.7 // between 0 and 1
const coefIncreasing = 1.2
const colors = ['#FFA500', '#FF7F50', '#F0E68C', '#90EE90', '#008080', '#DEB887']
const NS = 'http://www.w3.org/2000/svg'
const populationMillions = [
    { 'Asia': 4721 },
    { 'Africa': 1426 },
    { 'Australia': 26 },
    { 'Europe': 743 },
    { 'North America': 600 },
    { 'South America': 436 }
]

const numberPeoples = populationMillions.reduce((accumulator, currentValue) => { return accumulator += Object.values(currentValue)[0] }, 0)
const svgMiddlePoint = svgPLotSize.map((el) => el / 2)

const procents = populationMillions.map((el) => Math.ceil(Object.values(el) * 10000 / numberPeoples) / 10000) // procent 0 to 1
const areaOfSectors = procents.map((el) => Math.PI * plotRadius * el)
const areaOutSectors = areaOfSectors.map((el, idx) => (el / procents[idx]) - 1)
const textOffsets = procents.map((el, idx) => procents.slice(0, idx).reduce((acc, cur) => { return acc += cur }, 0) * 360)
const arcs = procents.map((el, idx) => Math.PI * (((el * 180) + textOffsets[idx])) / 180) // угол центра сектора cо сдвигом в радианах

const plotParams = {
    'plotRadius': plotRadius,
    'svgPLotSize': svgPLotSize,
    'colors': colors,
    'NS': NS,
    'svgMiddlePoint': svgMiddlePoint,
    'offsetTextIntoSector': offsetTextIntoSector,
    'coefIncreasing': coefIncreasing,
    'procents': procents,
    'areaOfSectors': areaOfSectors,
    'areaOutSectors': areaOutSectors,
    'arcs': arcs
}
