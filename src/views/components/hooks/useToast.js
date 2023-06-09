import React from 'react'

const AppContext = React.createContext({
  showToastMessage: () => {},
  showLoading: () => {},
})

const useAppContext = () => {
  const {
    showToastMessage,
    showLoading,
    organisation,
    organisationId,
    userId,
  } = React.useContext(AppContext)
  const { Provider } = AppContext

  return {
    Provider,
    showToastMessage,
    showLoading,
    organisation,
    organisationId,
    userId,
  }
}

export default useAppContext
