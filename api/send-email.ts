import { VercelRequest, VercelResponse } from '@vercel/node'
import * as AWS from 'aws-sdk'

const ses = new AWS.SES({
  region: process.env.AWS_REGION || 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

interface RequestBody {
  email: string
  tasksSummary: string
}

export default async (req: VercelRequest, res: VercelResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { email, tasksSummary } = req.body as RequestBody

  if (!email || !tasksSummary) {
    return res.status(400).json({ error: 'Email and tasksSummary are required' })
  }

  if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
    console.error('AWS credentials not configured')
    return res.status(500).json({ error: 'Email service not configured' })
  }

  try {
    const params = {
      Source: process.env.SES_EMAIL_FROM || 'noreply@taskmanager.app',
      Destination: {
        ToAddresses: [email],
      },
      Message: {
        Subject: {
          Data: 'Resumen de tus tareas',
          Charset: 'UTF-8',
        },
        Body: {
          Html: {
            Data: generateEmailHTML(tasksSummary),
            Charset: 'UTF-8',
          },
        },
      },
    }

    await ses.sendEmail(params).promise()

    return res.status(200).json({
      success: true,
      message: 'Email enviado correctamente',
    })
  } catch (error: any) {
    console.error('Error sending email:', error)
    return res.status(500).json({
      error: 'Error al enviar el email',
      details: error.message,
    })
  }
}

function generateEmailHTML(tasksSummary: string): string {
  return `
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
        .content { background: white; padding: 20px; border: 1px solid #ddd; border-radius: 0 0 8px 8px; }
        .summary { background: #f9f9f9; padding: 15px; border-left: 4px solid #667eea; margin: 15px 0; border-radius: 4px; }
        .footer { text-align: center; padding: 15px; font-size: 12px; color: #999; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Resumen de Tareas</h1>
        </div>
        <div class="content">
          <p>Hola,</p>
          <p>Aquí está el resumen de tus tareas:</p>
          <div class="summary">
            ${tasksSummary}
          </div>
          <p>Accede a tu gestor de tareas para ver más detalles.</p>
        </div>
        <div class="footer">
          <p>© 2026 Task Manager. Todos los derechos reservados.</p>
        </div>
      </div>
    </body>
    </html>
  `
}
