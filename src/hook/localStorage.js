export const guardarNoLocalStorage = (nameDB, theTheme) => {
  window.localStorage.setItem(nameDB, theTheme)
}

export const acessarLocalStorage = (theTheme) => {
  if (typeof window === undefined) return null

  try {
    if (!theTheme) return null 

    const getItem = window.localStorage.getItem(theTheme)

    return getItem ? JSON.parse(getItem) : null
  } catch (error) { 
    console.error(`Erro no localStorage getItem: ${theTheme}!`, error)
    return null
  }
}
