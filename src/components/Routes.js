var Routes = {}

Routes.Main = {"id": 0, "name": "Main"}
Routes.Signin = {"id": 1, "name": "Signin"}
Routes.Signup = {"id": 2, "name": "Signup"}
Routes.Forget = {"id": 3, "name": "Forget"}

var Stack = [
  Routes.Main,
  Routes.Signin,
  Routes.Signup,
  Routes.Forget
]

Routes.Stack = Stack

module.exports = Routes