import { config } from 'dotenv'
import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

config()

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Preencha todos os campos do formulário.' },
        { status: 400 }
      )
    }

    const smtpHost = process.env.SMTP_HOST || 'smtp.hostinger.com'
    const smtpPort = Number(process.env.SMTP_PORT || 465)
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS
    const contactTo = process.env.CONTACT_TO || 'contato@danielscharp.com.br'
    console.log('SMTP Config:', { smtpHost, smtpPort, smtpUser, contactTo })
    if (!smtpUser || !smtpPass) {
      return NextResponse.json(
        {
          success: false,
          message:
            'As credenciais de e-mail ainda não foram configuradas. Defina SMTP_USER e SMTP_PASS no ambiente.',
        },
        { status: 500 }
      )
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      logger: false,
      debug: false,
    })

    await transporter.sendMail({
      from: smtpUser,
      to: contactTo,
      replyTo: email,
      subject: `Nova mensagem de contato de ${name}`,
      html: `
        <h2>Nova mensagem recebida</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${message.replace(/\n/g, '<br />')}</p>
      `,
      text: `Nova mensagem recebida\n\nNome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`,
    })

    return NextResponse.json({ success: true, message: 'Mensagem enviada com sucesso!' })
  } catch (error) {
    console.error('Contact form error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Não foi possível enviar a mensagem. Tente novamente em alguns instantes.',
      },
      { status: 500 }
    )
  }
}
