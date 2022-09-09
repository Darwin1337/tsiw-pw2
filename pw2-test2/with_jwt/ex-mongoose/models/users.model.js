module.exports = (mongoose) => {
    const schema = mongoose.Schema(
            {
                username: { type: String, required: [true, 'Username cannot be empty or null!'] },
                password: { type: String, required: [true, 'Password cannot be empty or null!'] },
                isAdmin:  { type: Boolean, default: false },
                rentals: [
                    {
                        book: { 
                            type: mongoose.Schema.Types.ObjectId,
                            ref: 'book'
                        },
                        requestedAt: { type: Date },
                        deliveredAt: { type: Date }
                    }                        
                ],
            },
            {
                timestamps: false
            }
        );
    const User = mongoose.model("user", schema);
    return User;
};