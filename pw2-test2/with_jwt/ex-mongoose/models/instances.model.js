module.exports = (mongoose) => {
    const schema = mongoose.Schema(
            {
                status: {
                    type: String,
                    enum : ['Available', 'Booked', 'Maintenance']
                },
                bookedBy: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'user'
                },
                returnDate: {
                    type: Date
                }         
            },
            {
                timestamps: false
            }
        );
    const Instance = mongoose.model("instance", schema);
    return Instance;
};