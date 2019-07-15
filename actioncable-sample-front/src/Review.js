import React, { useState, useEffect } from 'react';
import Cable from 'actioncable';

const Review = () => {
  const [socket, setSocket] = useState();
  const [reviews, updateReviews] = useState([]);

  useEffect(() => {
    createSocket(receivedReview);
  }, [])

  const receivedReview = (data) => {
    updateReviews(prev => prev.concat(data));
  }

  const createSocket = (callback) => {
    let cable = Cable.createConsumer('ws://localhost:8080/cable?access-token=6');
    const socket = cable.subscriptions.create({
      channel: 'ReviewChannel'
    }, {
      connected: () => {
        console.log('connected!!!');
      },
      received: (data) => {
        console.log({data});
        callback(data);
      },
      disconnected: function() {
        console.log('disconnected');
      },
    });
    setSocket(socket);
  }

  return (
    <div className="App">
      <div>review list</div>
      <div>
        {reviews.map(review => (
          <div key={review.id}>
            <h4>{review.product_name}</h4>
            <div>内容: {review.content}</div>
            <img alt="review_image" src={`http://localhost:3000/${review.picture.url}`} css={{ height: '100px' }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Review;
