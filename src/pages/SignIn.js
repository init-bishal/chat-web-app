import {Container,Grid,Row,Col,Panel,Button,Icon, Alert} from 'rsuite'
import { auth,database } from '../misc/firebase'
import firebase from 'firebase/app'
const SignIn = () => {
    const signInWithProvider=async(provider)=>{
        try{
            const {additionalUserInfo,user}=await auth.signInWithPopup(provider)
            Alert.success("Signed in",4000)
            if(additionalUserInfo.isNewUser)
            {
                await database.ref(`/profile/${user.uid}`).set({
                    name:user.displayName, 
                    createdAt:firebase.database.ServerValue.TIMESTAMP
                })
            }
        }
        catch(err)
        {
            Alert.info(err.message,4000) ;
        }
    }

    const onFacebookSignIn=()=>{
        signInWithProvider(new firebase.auth.FacebookAuthProvider())
    }
    const onGoogleSignIn=()=>{
        signInWithProvider(new firebase.auth.GoogleAuthProvider())
    }
    return (
        <Container>
            <Grid className='mt-page'>
                <Col xs={24} md={12} mdOffset={6}>
                    <Panel>
                        <div className='text-center'>
                            <h2>Welcome to Chat</h2>
                            <p >Progressive chat platform for neophytes</p>
                        </div> 
                        <div className='mt-3'>
                            <Button block color="blue" onClick={onFacebookSignIn}>
                                <Icon icon="facebook">Continue with facebook</Icon>
                            </Button>
                            <Button block color="green" onClick={onGoogleSignIn}>
                                <Icon icon="google">Continue with google</Icon>
                            </Button>
                        </div>
                    </Panel>
                </Col>   
            </Grid>
        </Container>
    )
}

export default SignIn
