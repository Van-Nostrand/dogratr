import React from 'react'
import useShallowEqualSelector from '@/hooks/useShallowEqualSelector'
import { IRootStore, IHistory } from '@/store/types'
// import seedStore from '@/functions/seedStore'
import './account.scss'

export default function Account () {

  const { history } = useShallowEqualSelector((state: IRootStore) => state.rating)
  const { pups } = useShallowEqualSelector((state: IRootStore) => {
    console.log('STATE IS', state)
    return state.pupper
  })

  // const findPup = (id: string) => pups.find((p) => p.id === id)

  console.log('pups???', pups)
  const historyItem = (data: IHistory, i: number) => (
    <li
      key={`hitem${i}`}
      className="h-item"
    >
      <div className="h-item__img">Picture: TODO</div>
      {/* <div className="h-item__name">Name: { findPup(data.id).name }</div> */}
      <div className="h-item__value">Value: { data.value }</div>
      <div className="h-item__id">Id: { data.id }</div>
    </li>
  )

  const renderHistory = () => history.map((pup: IHistory, i: number) => historyItem(pup, i))

  return (
    <div className="account-page">
      <div className="account-page__title">the account page</div>
      <div className="history">
        <ul className="history-list">
          { renderHistory() }
        </ul>
      </div>
    </div>
  )
}
