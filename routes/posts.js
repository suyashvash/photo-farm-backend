import { Router } from 'express'
import FarmPost from '../models/posts.model.js'
import User from '../models/user.model.js'

const postRouter = Router();


postRouter.route('/showall').get((req, res) => {
    FarmPost.find().sort({ updatedAt: 'desc' })
        .then(response => { res.json(response) })
        .catch(err => res.json(err))
})

postRouter.route('/addPost').post((req, res) => {
    const token = req.body.token;
    const caption = req.body.caption;
    const postUrl = req.body.postUrl;

    User.findById(token)
        .then(user => {
            username = user.username
            const newPost = FarmPost({ token, username, caption, postUrl })
            newPost.save()
                .then(() => res.json({ status: true, message: "Post added" }))
                .catch(() => res.json({ status: false, message: "Post creation failed" }))

        })
        .catch(err => { res.json({ status: false, message: "User not found or Invalid token!", log: "Token is invalid or corrupted data has beed sent!" }) })

})

postRouter.route('/mypost/:id').get((req, res) => {

    FarmPost.find({ token: req.params.id }).sort({ updatedAt: 'desc' })
        .then(post => { res.json({ status: true, message: "Posts found", data: post }) })
        .catch(err => { res.json({ status: false, message: "User not found or Invalid token!", log: "Token is invalid or corrupted data has beed sent!" }) })
})


postRouter.route('/updatepost/:id').post((req, res) => {
    FarmPost.findById(req.params.id)
        .then(post => {
            post.url = req.body.url;
            post.caption = req.body.caption;
            post.save()
                .then(() => res.json({ status: true, message: "Post Updated" }))
                .catch(err => res.json({ status: false, message: "Post not updated" }));
        })
        .catch(err => res.json(err))
})

postRouter.route('/deletepost/:id').delete((req, res) => {
    FarmPost.findByIdAndDelete(req.params.id)
        .then(response => res.json({ status: true, message: "Post Deleted Successfully!" }))
        .catch(() => res.json({ status: false, message: "Post deletion failed !" }))
})

export default postRouter;