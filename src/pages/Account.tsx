import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import useShallowEqualSelector from '@/hooks/useShallowEqualSelector'
import { IRootStore, IHistory } from '@/store/types'
import { getPagedRatingsForUser } from '@/functions/getFunctions'
import { setHistory } from '@/store/rating/ratingSlice'
import { Link } from 'react-router-dom'

import './account.scss'

export default function Account () {
  const dispatch = useDispatch()
  const {
    history,
    verifiedLogin,
    checkingToken,
    username,
    email
  } = useShallowEqualSelector((state: IRootStore) => ({
    history: state.rating.history,
    verifiedLogin: state.auth.verifiedLogin,
    checkingToken: state.auth.checkingToken,
    username: state.auth.username,
    email: state.auth.email
  }))

  const [page, setPage] = useState<number>(0)
  const [placeholders, setPlaceholders] = useState<Set<number>>(new Set())

  // load initial 20 ratings in history
  useEffect(() => {
    // load ratings from the db
    if (verifiedLogin && !checkingToken && username && email) {
      getPagedRatingsForUser({ username: 'mike', imageID: [...placeholders][page] ?? 0 })
        .then((res) => {
          dispatch(setHistory(res))
        })
    }
  }, [verifiedLogin, checkingToken, username, email])

  // keeping track of placeholders
  // placeholders is the last image id, so we can query the DB and omit lower ids
  useEffect(() => {
    if (history.length > 0) {
      const newPlaceholders = new Set(placeholders)
      newPlaceholders.add(history[history.length - 1].imageID)
      setPlaceholders(newPlaceholders)
    }
  }, [history])

  // handle page changes
  useEffect(() => {
    console.log('PAGE JUST CHANGED', page)
    if (page !== 0) {
      getPagedRatingsForUser({ username: 'mike', imageID: [...placeholders][page] ?? 0 })
        .then((res) => {
          dispatch(setHistory([...history, ...res]))
        })
    }
  }, [page])

  const historyItem = (data: IHistory, i: number) => (
    <div
      key={`hitem${i}`}
      className="h-item"
    >
      <div className="h-item__img">Picture: TODO</div>
      <div className="h-item__value">Rating: { data.value }</div>
      <div className="h-item__id">Pupper ID: { data.pupID }</div>
      <div className="h-item__date">date: { new Date(data.created).toLocaleString() }</div>
    </div>
  )

  /**
    // data in mariadb
    created: "2022-11-06T00:29:13.000Z"
    imageID: 1
    pupID: 99
    username: "mike"
    value: 2
   */

  const renderHistory = () => history.map((pup: IHistory, i: number) => historyItem(pup, i))
  if (!verifiedLogin && checkingToken) {
    // loading mode here
    // verify failure will be handled elsewhere
    // console.log('ACCNT SCREEN NOT VERIFIED YET')
  } else {
    // console.log('ACCNT SCREEN VERIFIED')
  }

  // const renderVerifyComponent = () => (
  //   <div className="account-page__verification">
  //     <div>{ verifiedLogin ? 'account verified' : 'not verified' }</div>
  //     <div>{ checkingToken ? 'checking token' : 'done checking token'}</div>
  //     { !verifiedLogin && !checkingToken && <div>{'creds aren\'t authentic'}</div> }
  //     { verifiedLogin && !checkingToken && <div>{'creds are authentic'}</div>}
  //   </div>
  // )

  return (
    <div className="account-page">
      <div className="account-page__title">the account page</div>
      <Link to="/create-pupper">Create Pupper</Link>
      <button onClick={() => setPage(page + 1)}>next page</button>

      { verifiedLogin && !checkingToken && history
        ? (
          <div className="history">
            <div className="history-list">
              { renderHistory() }
            </div>
          </div>
        ) : (
          <div>STILL LOADING VERIFICATION</div>
        )
      }

      {/* { renderVerifyComponent() } */}
    </div>
  )
}
