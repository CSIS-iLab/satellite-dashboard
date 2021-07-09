const oneDay = 24 * 60 * 60 * 1000

export default class Orbitals {
  static PadOrbitals(orbitals, targetDate, numDays) {
    targetDate = targetDate.setHours(0, 0, 0, 0).valueOf()
    const paddedOrbitals = []
    let pointer = 0
    for (let i = 0; i < numDays; i++) {
      let lastOrbital = orbitals[pointer]
      if (lastOrbital === undefined) {
        lastOrbital = orbitals[--pointer]
      }
      const epochDate = new Date(orbitals[pointer].elements.Epoch).setHours(
        0,
        0,
        0,
        0
      )
      if (targetDate <= epochDate.valueOf()) {
        paddedOrbitals.push(lastOrbital)
      } else {
        lastOrbital = orbitals[++pointer] || lastOrbital
        paddedOrbitals.push(lastOrbital)
      }
      targetDate = targetDate + oneDay
    }
    return paddedOrbitals
  }
}
