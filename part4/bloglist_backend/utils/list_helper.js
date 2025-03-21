const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + (blog.likes || 0), 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null

    return blogs.reduce((max, blog) => (blog.likes > max.likes ? blog : max), blogs[0])
}

const _ = require('lodash')

const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null

    const authorCounts = _.countBy(blogs, 'author') // Count blogs per author
    const topAuthor = _.maxBy(_.keys(authorCounts), (author) => authorCounts[author])

    return {
        author: topAuthor,
        blogs: authorCounts[topAuthor]
    }
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) return null

    const authorLikes = _.groupBy(blogs, 'author') // Group blogs by author
    const totalLikes = _.map(authorLikes, (blogs, author) => ({
        author,
        likes: _.sumBy(blogs, 'likes') // Sum likes for each author
    }))

    return _.maxBy(totalLikes, 'likes') // Find author with most likes
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}
