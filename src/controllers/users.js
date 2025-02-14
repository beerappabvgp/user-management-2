export const message = (req, res) => {
    res.send("Hi there!!!");
}

export const createUser = async (req, res) => {
    try {
        console.log(req.body);
        res.send("user created ... ");
    } catch (error) {
        console.log(error);
    }
}