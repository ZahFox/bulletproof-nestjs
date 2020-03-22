import { Injectable } from '@nestjs/common'
import Queue, { Job } from 'bull'
import { RedisService } from './redis'
import { Logger } from 'src/loaders'

type JobQueue = Queue.Queue

@Injectable()
export class JobsService {
  private readonly jobQueue: JobQueue

  public constructor(private readonly redisService: RedisService) {
    Logger.info('configuring the job queue')

    const { host, port, pass } = this.redisService.getConfig()
    this.jobQueue = new Queue('jobs', {
      redis: {
        host: host,
        port: port,
        password: pass,
      },
    })

    this.jobQueue.on('completed', this.handleCompleteJob)
    this.jobQueue.process(this.exampleJob)
    this.jobQueue.add({}, { repeat: { cron: '* * * * *' } })
  }

  private exampleJob = (
    job: any,
    done: (error?: Error | null, value?: string) => void,
  ) => {
    const timestamp = new Date().toLocaleString()
    Logger.info(`ran example job at ${timestamp}`)
    done(null, 'success')
  }

  private handleCompleteJob = (job: Job<any>, message: string) => {
    Logger.info(`job completed: ${message}`)
  }
}
