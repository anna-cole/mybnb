const Map = () => {

  return (
    <div>
      <h3>Where you'll be:</h3>
      <address id='address'>
        Av. Dr. Geraldo de Melo Ourivio, 1153 <br/>
        Camboinhas, Niterói - RJ, 24346-030, Brazil 
      </address><br/>
      <div className="responsive-map">
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3673.7955839346214!2d-43.069893926218334!3d-22.957754239691482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9986fb12ddc6d9%3A0x626e6322c04503ef!2sCondom%C3%ADnio%20Oceanside!5e0!3m2!1sen!2sus!4v1715744135052!5m2!1sen!2sus" width="600" height="450" allowFullScreen loading="lazy" referrerpolicy="no-referrer-when-downgrade" title='map'></iframe>
      </div>
    </div>

  )
}

export default Map