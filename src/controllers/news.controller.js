import newsService from '../services/news.service.js';


const create = async (req, res) => {
    try {
        const {
            title,
            text,
            banner,
        } = req.body;

        if (!title || !text || !banner) {
            res.status(400).send('Submit all fields for registration')
        }

        await newsService.createService({
            title,
            text,
            banner,
            user: req.userId
        });

        console.log(req.userId);
        res.send('created')
    } catch (e) {
        res.status(500).send({
            message: e.message
        })
    }
}

const getAll = async (req, res) => {
    try {
        let {
            limit,
            offset
        } = req.query;

        limit = Number(limit);
        offset = Number(offset);

        if (!limit) {
            limit = 5;
        }

        if (!offset) {
            offset = 0;
        }


        const news = await newsService.findAllService(offset, limit);
        const next = offset + limit;
        const total = await newsService.countNewsService();
        const currentUrl = req.baseUrl;

        const nextUrl = next < total ? `${currentUrl}?limit=${limit}&offset=${next}` : null;

        const previous = offset - limit < 0 ? null : offset - limit;
        const previousUrl = previous != null ? `${currentUrl}?limit=${limit}&offset=${previous}` : null;

        if (news.length === 0) {
            res.status(400).send({
                message: 'There are no registered news'
            })
        }

        res.send({
            nextUrl,
            previousUrl,
            limit,
            offset,
            total,

            results: news.map((item) => {
                return {
                    id: item._id,
                    title: item.title,
                    text: item.text,
                    banner: item.banner,
                    likes: item.likes,
                    comments: item.comments,
                    name: item.user.name,
                    userName: item.user.username,
                    userAvatar: item.user.avatar,
                }
            })
        })
    } catch (e) {
        res.status(500).send(e.message)
    }
}

const topNews = async (req, res) => {
    try {
        const news = await newsService.topNewsService()

        if (!news) {
            return res.status(400).send({
                message: 'There are no registred news'
            })
        }

        res.send({
            news: {
                id: news._id,
                title: news.title,
                text: news.text,
                banner: news.banner,
                likes: news.likes,
                comments: news.comments,
                name: news.user.name,
                userName: news.user.username,
                userAvatar: news.user.avatar,
            }
        })
    } catch (e) {
        res.status(500).send(e.message)
    }
}

const findById = async (req, res) => {
    try {
        const {
            id
        } = req.params;

        const news = await newsService.findByIdService(id);

        if (!news) {
            res.status(400).send({
                message: 'Not found news'
            })
        }
        res.send({
            news: {
                id: news._id,
                title: news.title,
                text: news.text,
                banner: news.banner,
                likes: news.likes,
                comments: news.comments,
                name: news.user.name,
                userName: news.user.username,
                userAvatar: news.user.avatar,
            }
        })
    } catch (e) {
        res.status(500).send(e.message)
    }
}

const searchByTile = async (req, res) => {
    try {

        const {
            title
        } = req.query;

        const news = await newsService.searchByTitleService(title);

        if (news.length <= 0) {
            return res.status(400).send({
                message: 'There are no news with this title'
            })
        }

        res.send({
            results: news.map((item) => {
                return {
                    id: item._id,
                    title: item.title,
                    text: item.text,
                    banner: item.banner,
                    likes: item.likes,
                    comments: item.comments,
                    name: item.user.name,
                    userName: item.user.username,
                    userAvatar: item.user.avatar,
                }
            })
        })

    } catch (e) {
        res.status(500).send(e.message)
    }
}

const byUser = async (req, res) => {
    try{
        const id = req.userId;

         const news = await newsService.byUserService(id)

         if(news.length <= 0) {
            return res.status(400).send({message: 'There are not registred news by user'})
         }

         res.send({
            results: news.map((item) => {
                return {
                    id: item._id,
                    title: item.title,
                    banner: item.banner,
                    text: item.text,
                    likes: item.likes,
                    comments: item.comments,
                    name: item.user.name,
                    userName: item.user.username,
                    userAvatar: item.user.avatar,
                }
            })
         })
    }catch(e){
        res.status(500).send(e.message)
    }
}

const update = async (req, res) => {
    try{
        const {title, text, banner} = req.body;
        const {id} = req.params;
        

        if(!title && !text && !banner) {
            return res.status(400).send({message: 'Submit at least one field to update the post'})
        }

        const news = await newsService.findByIdService(id);

        if(news.user._id.toString() !== req.userId.toString()){
            return res.status(401).send({message: "You didn't update this post"})
        }

        await newsService.updateService(id, title, text, banner);

        return res.send({message: 'Post successfully update!'})
    }catch(e){
        res.status(500).send(e.message)
    }
}

const exclude = async (req, res) => {
    const {id} = req.params;

    const news = await newsService.findByIdService(id);

    if(news.user._id.toString() != req.userId.toString()) {
        return res.status(400).send({message: "You didn't delete this news"})
    }

    await newsService.excludeService(id)

    return res.send({message: 'News delete successfully'})
}

const likeNews = async (req, res) => {
    try{
        const {id} = req.params;
        const userId = req.userId;
    
        const newsLike = await newsService.likeNewsService(id, userId);

        if(!newsLike) {
            await newsService.deleteLikeNewsService(id, userId);
            
            return res.status(200).send({message: 'Like successfully removed'})
        }

        res.send({message: 'Like done successfully '});
    }catch(e) {
        res.status(500).send(e.message)
    }


}

const comments = async( req, res) => {
    try{
        const {id} = req.params;
        const {comment} = req.body;
        const userId = req.userId;

        await newsService.addCommentService(id, comment, userId)
        res.send('teste')
    }catch(e) {
        res.status(500).send(e.message)
    }
}

const deleteComment = async (req, res) => {
    const {idNews, idComment} = req.params;
    const userId = req.userId;

    const commentsDeleted = await newsService.deleteCommenteService(idNews, idComment, userId);

    const commentFinder = commentsDeleted.comments.find(comment => comment.idComment === idComment)

    if(!commentFinder) {
        return res.status(400).send({message: "Comment dont't exists"})
    }

    if(commentFinder.comments.userId !== userId) {
        return res.status(400).send({message: "You can't delete this comment"})
    }


    res.send({message: 'Comment delete successfully'})
}
export default {
    create,
    getAll,
    topNews,
    findById,
    searchByTile,
    byUser,
    update,
    exclude,
    likeNews,
    comments,
    deleteComment,
}