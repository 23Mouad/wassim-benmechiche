import cloudinary from "./cloudinary"

export async function uploadToCloudinary(file: File, folder = "portfolio") {
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)

  return new Promise<{ secure_url: string }>((resolve, reject) => {
    cloudinary.uploader
      .upload_stream({ folder: folder }, (error, result) => {
        if (error) reject(error)
        else resolve({ secure_url: result!.secure_url })
      })
      .end(buffer)
  })
}

