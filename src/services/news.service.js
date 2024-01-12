import newsModel from '../models/News.js';

const createService = (body) => newsModel.create(body)

const findAllService = (offset, limit) => newsModel.find()
.sort({_id: -1})
.skip(offset)
.limit(limit)
.populate('user');

const countNewsService = () => newsModel.countDocuments();

const topNewsService = () => newsModel.findOne()
.sort({_id: -1})
.populate('user');

const findByIdService = (id) => newsModel.findById(id)
.populate('user')
 
const searchByTitleService = (title) => newsModel.find({
    title: {$regex: `${title || ''}`, $options: 'i'}
})
.sort({_id: -1})
.populate('user')


const byUserService = (id) => newsModel.find({user: id})
.sort({_id: -1})
.populate('user');

const updateService = (id, title, text, banner) => newsModel.findOneAndUpdate({_id: id}, {title, text, banner}, {rawResults: true})
.populate('user')


const excludeService = (id) => newsModel.findOneAndDelete({_id: id})
.populate('user');

const likeNewsService = (idNews, userId) => newsModel.findOneAndUpdate({
_id: idNews, 'likes.userId': {$nin: [userId]} },
{$push: {likes: {userId, createdAt: new Date() } }})

const deleteLikeNewsService = (idNews, userId) => newsModel.findOneAndUpdate(
{_id: idNews},
{$pull: {likes: {userId}}});


const addCommentService = (idNews, comment, userId) => {
    const idComment = Math.floor(Date.now() * Math.random()).toString(36)

    return newsModel.findOneAndUpdate({_id: idNews}, {$push: {comments: {idComment, userId, comment, createdAt: Date.now()}}});
}
 

const deleteCommenteService = (idNews, idComment, userId) => {
    return newsModel.findOneAndUpdate({_id: idNews}, {$pull: {comments: {idComment, userId}}})
}
export default {
    createService,
    findAllService,
    countNewsService,
    topNewsService,
    findByIdService,
    searchByTitleService,
    byUserService,
    updateService,
    excludeService,
    likeNewsService,
    deleteLikeNewsService,
    addCommentService,
    deleteCommenteService
}