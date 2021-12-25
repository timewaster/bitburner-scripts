import {
  getNsDataThroughFile as fetch,
  announce,
  getLSItem,
  setLSItem,
  disableLogs
} from 'helpers.js'

/** @param {NS} ns **/
export async function main(ns) {
  disableLogs(ns, ['sleep'])
  const inAnyGang = await fetch(ns, `ns.gang.inGang()`, '/Temp/gang.inGang.txt')
  if ( !inAnyGang )
    return ns.print('no gang') // can't ascend members for a gang that doesn't exist


  const nextClashTime = getLSItem('clashtime')
  if ( nextClashTime && nextClashTime > Date.now()+1000 ) {
    await ns.sleep(nextClashTime - Date.now() - 1000)
  }

  const currentGangData = JSON.stringify(ns.gang.getOtherGangInformation())
  while( gangDataIsTheSame(ns, currentGangData)) {
    await ns.sleep(10)
  }

  setLSItem('clashtime', Date.now())
  announce(ns, `ClashTime set to ${Date.now()}`)
}

function gangDataIsTheSame(prev) {
  const curr = JSON.stringify(ns.gang.getOtherGangInformation())

  return prev == curr
}
