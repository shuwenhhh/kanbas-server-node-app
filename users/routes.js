import * as dao from "./dao.js";
function UserRoutes(app) {
    const isNullorEmpty = (str) => {
        return str === undefined || str === "undefined" || str === null || str.trim() === '';
    }
    const createUser = async (req, res) => {
        if (isNullorEmpty(req.body.username)) {
            res.status(400).json(
                { message: "Please provide username" });
                return
        }
        if (isNullorEmpty(req.body.password)) {
            res.status(400).json(
                { message: "Please provide password" });
                return
        }
        const username = await dao.findUserByUsername(
            req.body.username);
        if (username) {
            res.status(400).json(
                { message: "Username already taken" });
                return
        }
        const user = await dao.createUser(req.body);
        res.json(user);
    };
    const deleteUser = async (req, res) => {
        const status = await dao.deleteUser(req.params.userId);
        res.json(status);
    };
    const findAllUsers = async (req, res) => {
        const users = await dao.findAllUsers();
        res.json(users);
    };
    const findUserById = async (req, res) => {
        const user = await dao.findUserById(req.params.userId);
        res.json(user);
    };
    const updateUser = async (req, res) => {
        const { userId } = req.params;
        console.log("userId",userId,isNullorEmpty(userId))
        if (isNullorEmpty(req.body.username)) {
            res.status(400).json(
                { message: "Please enter username" });
                return
        }
        if (isNullorEmpty(req.body.password)) {
            res.status(400).json(
                { message: "Please enter password" });
                return
        }
        if(isNullorEmpty(userId)) {
            res.status(400).json(
                { message: "Cannot update unknown user" });
            return
        }
        const status = await dao.updateUser(userId, req.body);
        const currentUser = await dao.findUserById(userId);
        req.session['currentUser'] = currentUser;
        res.json(status);
    };
    const signup = async (req, res) => {
        console.log(req)
        if (isNullorEmpty(req.body.username)) {
            res.status(400).json(
                { message: "Please enter username" });
                return
        }
        if (isNullorEmpty(req.body.password)) {
            res.status(400).json(
                { message: "Please enter password" });
                return
        }
        const user = await dao.findUserByUsername(
            req.body.username);
        if (user) {
            res.status(400).json(
                { message: "Username already taken" });
                return
        }
        const currentUser = await dao.createUser(req.body);
        req.session['currentUser'] = currentUser;
        res.json(currentUser);
    };
    const signin = async (req, res) => {
        const { username, password } = req.body;
        if (isNullorEmpty(username)) {
            res.status(400).json(
                { message: "Please enter username" });
                return
        }
        if (isNullorEmpty(password)) {
            res.status(400).json(
                { message: "Please enter password" });
                return
        }
        const currentUser = await dao.findUserByCredentials(username, password);
        if(currentUser) {
        req.session['currentUser'] = currentUser;
        res.json(currentUser);
        } else {
            res.status(400).json(
                { message: "Invalid credentials" });
                return
        }
    };
    const signout = (req, res) => {
        req.session.destroy();
        res.json(200);
    };
    const account = async (req, res) => {
        res.json(req.session['currentUser']);
    };
    app.post("/api/users", createUser);
    app.get("/api/users", findAllUsers);
    app.get("/api/users/:userId", findUserById);
    app.put("/api/users/:userId", updateUser);
    app.delete("/api/users/:userId", deleteUser);
    app.post("/api/users/signup", signup);
    app.post("/api/users/signin", signin);
    app.post("/api/users/signout", signout);
    app.post("/api/users/account", account);
}
export default UserRoutes;

