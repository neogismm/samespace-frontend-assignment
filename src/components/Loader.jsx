import React from 'react';

const Loader = () => {
  return (
    <div style={styles.loaderContainer}>
      <div style={styles.loader}>
        <div style={styles.innerCircle}></div>
      </div>
      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

const styles = {
  loaderContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '20vh',
  },
  loader: {
    width: '50px',
    height: '50px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    background: 'linear-gradient(0deg, #FFFFFF 50%, #1DB954 100%)',
    animation: 'spin 1s linear infinite',
  },
  innerCircle: {
    width: '90%',
    height: '90%',
    backgroundColor: '#191414',
    borderRadius: '50%',
  },
};

export default Loader;
