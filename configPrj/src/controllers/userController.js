import AsyncStorage from "@react-native-async-storage/async-storage"
import { timerThreeMinut } from "../other/utils/timerThreeMinuts"
import { getCodeForRegister, verifyCodeLoginForAdmin, login, verifycodeRegister, verifycodeForgetPass, resetPassword, getCodeForgetPass } from "../services/userService"
import axios from "axios"
import reload from "../other/utils/reload"
import _Alert from "../other/utils/alert"
import jwtDecode from "jwt-decode"
import { StackActions } from "@react-navigation/native"

export function userController(p) {

  this.startThreeMinut = async () => {
    await AsyncStorage.removeItem('localDate')
    timerThreeMinut(p.settwoMinut, (interval) => p.timerInterwal.current = interval)
  }

  this.getCodeForRegister = async () => {
    await getCodeForRegister({ fullname: p.fullname, phoneOrEmail: p.phoneOrEmail, password: p.password })
    this.startThreeMinut()
    p.navigation.replace('GetCode', { register: 'true' })
  }


  this.verifycodeRegister = async () => {
    await verifycodeRegister({ code: p.code })
    p.navigation.navigate('Login')
  }


  this.login = async () => {
    const { data } = await login({ phoneOrEmail: p.phoneOrEmail, password: p.password, remember: p.remember, captcha: p.captcha })
    if (!data?.value) {
      this.startThreeMinut()
      p.navigation.replace('GetCode', { login: 'true' })
    }
    else {
      await AsyncStorage.setItem('token', data.value)
      axios.defaults.headers.common["Authorization"] = data.value
      const user = jwtDecode(data.value)
      p.settokenValue(user)
      p.setphoneOrEmail('')
      p.setpassword('')
      p.setcaptcha('')
      if (p.route.params?.payment) p.navigation.navigate('BeforePayment', { screen: 'ProductBasket' });
      else p.navigation.dispatch(StackActions.replace('Profile'))
    }
  }


  this.verifyCodeLoginForAdmin = async () => {
    const { data } = await verifyCodeLoginForAdmin({ code: p.code })
    await AsyncStorage.setItem('token', data.value)
    axios.defaults.headers.common["Authorization"] = data.value
    const user = jwtDecode(data.value)
    p.settokenValue(user)
    p.setphoneOrEmail('')
    p.setpassword('')
    p.setcaptcha('')
    if (p.route.params?.payment) p.navigation.navigate('BeforePayment', { screen: 'ProductBasket' });
    else p.navigation.dispatch(StackActions.replace('Profile'))
  }

  //! resetPassword
  this.getCodeForgetPass = async () => {
    await getCodeForgetPass(p.route.params?.newCode, { phoneOrEmail: p.phoneOrEmail })
    this.startThreeMinut()
    p.setphoneOrEmail('')
    p.navigation.replace('GetCode', { forgetPass: 'true', newCode: 'true' })
  }


  this.verifycodeForgetPass = async () => {
    await verifycodeForgetPass({ code: p.code })
    p.setcode('')
    p.navigation.dispatch(StackActions.replace('ResetPass'))
  }


  this.resetPassword = async () => {
    await resetPassword({ password: p.password, confirmPassword: p.confirmPassword })
    p.setpassword('')
    p.setconfirmPassword('')
    p.navigation.navigate('Login')
  }
  //! resetPassword


  //!resetSpecification
  this.getUserSpecification = async () => {
    useEffect(() => {
      (async () => {
        const { data } = await getUserSpecification()
        p.setfullname(data.fullname)
        p.setphoneOrEmail(data.phoneOrEmail)
      })()
    }, [])
  }


  this.resetSpecification = async () => {
    await resetSpecification({ fullname: p.fullname, password: p.password, oldPassword: p.oldPassword, phoneOrEmail: p.phoneOrEmail })
    this.startThreeMinut()
    p.setfullname('')
    p.setphoneOrEmail('')
    p.setpassword('')
    p.setoldPassword('')
    p.navigation.replace('GetCode', { resetSpecification: 'true', newCode: 'true' })
  }


  this.verifycodeResetSpecification = async () => {
    const { data } = await verifycodeResetSpecification({ code: p.code })
    await AsyncStorage.setItem("token", data.value)
    axios.defaults.headers.common["Authorization"] = data.value;
    const user = jwtDecode(data.value);
    p.settokenValue(user);
    p.setcode('')
    p.navigation.dispatch(StackActions.replace('Profile'))
  }
  //!resetSpecification


   //! imageProfile
   this.sendImageProfile = async () => {
    imagePicker().then(async (res) => {
      const { data } = await sendImageProfile({ imageUrl: res })
      setTimeout(() => { p.$.id('card2Image')?.$({ src: { uri: `${localhost}/upload/profile/${data.imageUrl}` } }) }, 3000);
      setTimeout(() => { p.$.id('card2Image')?.$({ src: { uri: `${localhost}/upload/profile/${data.imageUrl}` } }) }, 5000);
    })
  }


  this.getImageProfile = async () => {
    useEffect(() => {
      (async () => {
        const { data } = await getImageProfile()
        p.setimageProfile(data.imageUrl)
      })()
    }, [])
  }
  //! imageProfile


  //! sendProposal
  this.sendProposal = async () => {
    await sendProposal({ message: p.message })
    p.setmessage('')
  }
  //! sendProposal

  //! getLastPayment
  this.getLastPayment = () => {
    _useEffect(() => {
      (async () => {
        const { data } = await getLastPayment()
        p.setlastPayment(data.value);
      })()
    }, [])
  }
  //! getLastPayment


  
  //! Ticket
  this.getAnswersTicket = () => {
    _useEffect(() => {
      (async () => {
        const { data } = await getAnswersTicket(p.route.params.id)
        p.setanswersTicket(data.value)
      })()
      return () => p.setanswersTicket([])
    }, [])
  }


  this.sendNewTicket = async () => {
    const { data } = await sendNewTicket({ title: p.title, message: p.message, imageUrl: p.imageUrl })
    p.setuserTicketBox(ticketBox => {
      const ticket = [...ticketBox]
      ticket.unshift(data.value)
      return ticket
    })
    p.settitle('')
    p.setmessage('')
    p.setimageUrl('')
    p.navigation.navigate('Profile')
  }


  this.sendTicketAnswer = async (call, message) => {
    const { data } = await sendTicketAnswer({ message, imageUrl: p.imageUrl }, p.route.params.id)
    p.setanswersTicket(singleTicket => {
      const answer = [...singleTicket]
      answer.unshift(data.value)
      return answer
    })
    call()
    p.setimageUrl({})
  }



  this.deleteAnswerTicket = async (ticketId) => {
    _Alert.alert(
      "برای تایید کلیک کنید",
      "",
      [
        { text: "cancel", onPress: () => { } },
        {
          text: "OK", onPress: async () => {
            await deleteAnswerTicket(p.route.params.id, ticketId)
            p.setanswersTicket(singleTicket => {
              const filter = singleTicket.filter(a => a._id !== ticketId)
              return filter
            })
          }
        }
      ]
    )
  }



  this.editAnswerTicket = async (ticketId, call) => {
    const { data } = await editAnswerTicket({ message: p.message, imageUrl: p.imageUrl }, p.route.params.id, ticketId)
    p.setanswersTicket(singleTicket => {
      let ticket = [...singleTicket]
      const findIndex = ticket.findIndex(a => a._id === ticketId)
      ticket[findIndex].message = data.value.message
      ticket[findIndex].imageUrl = data.value.imageUrl
      return ticket
    })
    call()
    p.setimageUrl({})
    p.setmessage('')
  }


  this.getSingleAnswerTicket = async (itemId) => {
    const { data } = await getSingleAnswerTicket(p.route.params.id, itemId)
    p.setmessage(data.value.message)
  }


  this.ticketSeen = async () => {
    _useEffect(() => {
      ticketSeen(p.route.params.id).then(() => { })
      return () => ticketSeen(p.route.params.id).then(() => { })
    }, [])
  }


  this.deleteTicket = async (ticketId) => {
    _Alert.alert(
      "a", "",
      [
        { text: 'Cancel', onPress: () => { } },
        {
          text: 'OK', onPress: async () => {
            await deleteTicket(ticketId)
            p.setuserTicketBox(ticketBox => {
              const filter = ticketBox.filter(t => t._id !== ticketId)
              return filter
            })
          }
        }
      ]
    )
  }


  this.ticketBox = () => {
    _useEffect(() => {
      (async () => {
        const { data } = await ticketBox()
        p.setuserTicketBox(data.value)
      })()
    }, [])
  }


  this.sendTicketNotifeeAndSeen = () => {
    const navigation = useNavigation()
    _useEffect(() => {
      setTimeout(async () => {
        const { data } = await getTicketSeen()
        p.setticketSeen(data.seen)
        let newNotification = await AsyncStorage.getItem('ticketNotification')
        if (data?.ticket)
          if (data.ticket.message && !p.tokenValue.isAdmin && newNotification !== data.ticket.message) {
            create('جواب تیکت جدید', truncate(data.ticket.message, 30, false), require('../other/assets/images/logo.png'),
              () => {
                window.focus();
                navigation.navigate(`TicketBox`)
              }
            )
            await AsyncStorage.setItem('ticketNotification', data.ticket.message)
          }
      }, 1000)
    }, [])
  }
  //! Ticket



  
  //! savedProduct
  this.savedProduct = async () => {
    const { data } = await savedProduct(p.route.params.id)
    p.setbookmark(data.value)
  }


  this.removeSavedProduct = async (itemId) => {
    _Alert.alert(
      "برای تایید کلیک کنید",
      "",
      [
        { text: "cancel", onPress: () => { } },
        {
          text: "OK", onPress: async () => {
            await removeSavedProduct(itemId)
            p.setsavedItems(svItems => svItems.filter((item) => item.itemId !== itemId))
            p.setbookmark(false)
          }
        }
      ]
    )
  }


  this.getSavedProducts = async () => {
    _useEffect(() => {
      getSavedProducts().then(({ data }) => {
        p.setsavedItems(data.value)
      })
    }, [])
  }
  //! savedProduct



  this.logout = async () => {
    _Alert.alert(
      'برای تایید کلیک کید',
      '',
      [
        { text: 'no', onPress: () => { } },
        {
          text: 'yes', onPress: async () => {
            await AsyncStorage.removeItem('token')
            reload()
          }
        }
      ]
    )
  }


  this.verifycode = async () => {
    if (p.route.params.register) {
      this.verifycodeRegister()
    }
    else if (p.route.params.login) {
      this.verifyCodeLoginForAdmin()
    }
    else if (p.route.params.forgetPass) {
      this.verifycodeForgetPass()
    }
    // else if (p.route.params.resetSpecification) {
    //   this.verifycodeResetSpecification()
    // }
  }




}