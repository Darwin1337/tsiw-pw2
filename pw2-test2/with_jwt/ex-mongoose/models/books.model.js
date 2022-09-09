module.exports = (mongoose) => {
    const schema = mongoose.Schema(
            {
                title: { type: String, required: [true, 'Title cannot be empty or null!'] },
                instances: [{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'instance'
                }] 
            },
            {
                timestamps: false
            }
        );
    const Book = mongoose.model("book", schema);
    return Book;
};