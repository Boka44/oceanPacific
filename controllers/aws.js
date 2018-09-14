const s3 = require('../config/aws');
// const AWS_BUCKET = process.env.AWS_BUCKET;

//MaxKeys limits the amount of results

module.exports = {
    getAllImages: function(max){
        return new Promise((resolve, reject) => {

            const params = {
                Bucket: 'oceanpacific'
            }
            if(max) {
                params['MaxKeys'] = max;
            }
            s3.listObjects(params, (err, data) => {
                if(err) reject(err);
                let bucketContents = data.Contents;
                let result = [];
                let count = 0;
                for(let i = 0; i < bucketContents.length; i++) {
                    this.getImage(bucketContents[i].Key)
                    .then((url) => {
                        result.push(url)
                        count++;
                        if(count === bucketContents.length) {
                            resolve(result);
                        }
                    })
                    .catch((err) => {
                        throw err;
                    })
                }
            })
        })
        
    },
   
    getImage: function(img){
        return new Promise((resolve, reject) => {
            const urlParams = {
                Bucket: 'oceanpacific',
                Key: img
            }
            s3.getSignedUrl('getObject', urlParams, (err, url) => {
                if(err) reject(err);
                resolve(url);
            })
        })
        
    }
}