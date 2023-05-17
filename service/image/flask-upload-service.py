from flask import Flask, render_template, request, send_file
from flask_uploads import UploadSet, configure_uploads, IMAGES

app = Flask(__name__)

# allowed extenstions
ALLOWED_EXTENSIONS = {'svg', 'png', 'jpg', 'jpeg', 'gif'}

def get_extension(filename):
    if '.' in filename:
        return filename.rsplit('.', 1)[1].lower()
    return ''

def allowed_extension(ext):
    return ext in ALLOWED_EXTENSIONS

photos = UploadSet('photos', IMAGES)
# configure upload directory
# this is relative path, make absolute if you run into trouble returning
app.config['UPLOADED_PHOTOS_DEST'] = 'static/img'
configure_uploads(app, photos)
# POST expecting form <input type="file" name="photo">
# alt curl -X POST -F photo=@filename http://127.0.0.1:3000/image/456.png
@app.route('/image/<filename>', methods=['GET', 'POST'])
def upload(filename):
    ext = get_extension(filename)
    if allowed_extension(ext):

        if request.method == 'POST' and 'photo' in request.files:
            filenameSave = photos.save(request.files['photo'], name=f'{filename}')
            return f'Image has been uploaded successfully: {filenameSave}'

        filenameReturn= app.config['UPLOADED_PHOTOS_DEST'] +"/"+ filename
        return send_file(filenameReturn, mimetype=f'image/{ext}')

    return "Record not found or unsupported extenstion", 400

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=3000)
