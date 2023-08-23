import {Redirect} from 'react-router'
import {Route} from 'react-router'
import { useProfile } from '../context/profile.context'
import { Container,Loader } from 'rsuite'
const PrivateRoute = ({children,...routeProps}) => {
    // to consume we use the useContext hook
    // inside useContext() we need to specify the context that we created
    const {profile,isLoading}=useProfile()
    if(isLoading && !profile  )
    {
        return(
        <Container>
            <Loader center vertical size="md" content="Loading" speed='slow'/>
        </Container>
        )

    }
    if(!profile && !isLoading)
    {
        return <Redirect to="/signin"/>
    }
    return (
        <Route {...routeProps}>
            {children}
        </Route>
    )
}

export default PrivateRoute
