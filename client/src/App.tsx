import { useEffect } from 'react'
import { Route, Switch, useLocation } from 'wouter'
import { Nav, Footer } from './components/Chrome'
import Home from './pages/Home'
import ProjectPage from './pages/Project'
import Resume from './pages/Resume'
import NotFound from './pages/NotFound'

function ScrollToTop() {
  const [location] = useLocation()
  useEffect(() => {
    if (!window.location.hash) window.scrollTo(0, 0)
  }, [location])
  return null
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Nav />
      <main>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/work/:slug" component={ProjectPage} />
          <Route path="/resume" component={Resume} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </>
  )
}
