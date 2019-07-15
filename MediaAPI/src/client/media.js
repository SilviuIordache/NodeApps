Vue.component('media', {
  props: ['_id', 'UsageClass','CheckoutType','MaterialType', 'CheckoutYear', 'Checkouts', 'Title', 'Creator', 'Subjects', 'Publisher', 'PublicationYear'],
  template: `
  <article class="card mt-5"> 
    <section class="card-header"> 
      by {{ checkEmpty(Creator) }}
    </section>
    <section class="card-body">
      <h5 class="card-title text-center text-truncate"> title: {{ trimTitle(Title) }} </h5>
      <p class="card-text"> Publisher: {{ Publisher }} </p>
      <p class="card-text"> type: {{ MaterialType }} </p>
      <p class="card-text"> type: {{ MaterialType }} </p>
      <p class="card-text"> type: {{ MaterialType }} </p>
      <p class="card-text"> type: {{ MaterialType }} </p>
      <p class="card-text"> type: {{ MaterialType }} </p>
    </section>
    <div class="card-footer text-muted">
      Publicated on: {{ PublicationYear }}
    </div>
  </article>
    `,
    methods: {
       trimTitle: function(str) {
        let arr = [];
        let newStr = '';
      
        if (str.includes('/')) {
          arr = str.split(' / ');
          newStr = arr[0];
          //newStr = newStr.slice(1);
          if (newStr.includes('[')) {
            arr = newStr.split(' [');
            newStr = arr[0];
          }
        }
        return newStr;
      },

    }
});

Vue.component('media-list', {
  props: ['mediaItems'],
  template: `
  <div class="col">
    <media class="row" 
      v-for="media in mediaItems" 
      :MaterialType="media.MaterialType" 
      :Title="media.Title"
      :Creator="media.Creator" 
      :Publisher="media.Publisher" 
      :PublicationYear="media.PublicationYear"> 
    </media>
  </div>
  `
})

const mediaComp = Vue.component('mediaItems', {
  mounted: function () {
    //get mediaItems
    axios.get('/media/page/0').then((resp) => {
      this.mediaItems = resp.data;
    });
  },
  data: () => {
    return {
      mediaItems: []
    };
  },

  template: `
  <article>
  <media-list :mediaItems='mediaItems'></media-list>
  </article>
  `
})

