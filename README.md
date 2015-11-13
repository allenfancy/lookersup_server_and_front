# lookersup_server_and_front
前段nodejs expressjs  requirejs jquery(ajax)去调用后端 springmvc 写接口获取数据

#使用maven过程中记录的问题
    Maven的隐式对象：
    ${basedir}：项目根目录
    ${project.build.directory}构建目录，缺省为target
    ${project.build.outputDirectory}构建过程输出目录，缺省为target/classes
    ${project.build.finalName}产生五名称，缺省${project.aritifactId} - ${project.version}
    ${project.packaging}打包类型，缺省为jar
    ${project.xxx}当前pom文件的任意节点的内容
    
    maven根据profile中定义的环境变量打包的设置详解：
    <profiles>
      <profile>
        <id>dev</id>
        <activation>
          <activeByDefault>true</activeByDefault>
        </activation>
        <build>
          <finalName>${project.artifactId}</finalName>
          <resources>
            <resource>
              <directory>src/main/resources</directory>
            </resource>
            <resource>
              <directory>src/main/properties</directory>
            </resource>
          </resources>
        </build>
      </profile>
      <profile>
        <id>test</id>
        <activation>
          <activeByDefault>false</activeByDefault>
        </activation>
        <build>
          <finalName>${project.artifactId}-test</finalName>
          <resources>
            <resource>
              <directory>src/main/resources</directory>
            </resource>
            <resource>
              <directory>src/test/properties</directory>
            </resource>
          </resources>
        </build>
      </profile>
      <profile>
        <id>pro</id>
        <activation>
          <activeByDefault>false</activeByDefault>
        </activation>
        <build>
          <finalName>${project.artifactId}-test</finalName>
          <resources>
            <resource>
              <directory>src/main/resources</directory>
            </resource>
            <resource>
              <directory>src/pro/properties</directory>
            </resource>
          </resources>
        </build>
      </profile>
    </profiles>
#maven plugin详解：
    <pluginManagement>
        <plugins>
            <plugin>
                <groupId>org.apache.maven.plugins</groupId> <!-- mvn install,maven 会自动将source install到repository。
                                                                 mvn deploy,maven会自动将source deploy 到 remote-repository
                                                                 mvn source:jar,单独打包源码
                                                            
                                                            -->
                <artifactId>maven-source-plugin</artifactId>
                <version>2.2.1</verison>
                <executions>
                    <execution>
                        <phase>compile</phase> <!--在什么阶段打包源文件：在编译器打包成jar文件 -->
						<goals>
							<goal>jar</goal>
						</goals>
                    </execution>
                </exrcutions>
            </plugin>
            <!--配置tomcat启动 -->
            <plugin>
				<groupId>org.codehaus.mojo</groupId>
				<artifactId>tomcat-maven-plugin</artifactId>
				<version>1.1</version>
				<configuration>
					<path>/</path>
					<port>8088</port>
				</configuration>
			</plugin>
			<!-- 配置war包 -->
			<plugin>
				<artifactId>maven-war-plugin</artifactId>
				<version>2.1.1</version>
				<!-- 打包成war包的路径-->
				<configuration>
					<warSourceDirectory>${basedir}/src/main/webapp</warSourceDirectory>
				</configuration>
				<executions>
					<execution>
						<id>default-war</id>
						<phase>package</phase>
						<goals>
							<goal>war</goal>
						</goals>
					</execution>
				</executions>
			</plugin>
			<!--指定JDK版本和编码。compile插件能解决：1.maven2.1默认用jdk1.3来编译，maven3 貌似是用jdk1.5，如果项目用的JDK1.6会有问题，compile插件可以指定JDK版本为1.6.
			2.windows默认使用GBK编码，但是一般java的斑马为utf8,需要在compile插件中指出，否则中文乱码可能出现编译错误
	        <plugin>
                <artifactId>maven-compiler-plugin</artifactId>
                <version>2.3.2</version>
                 <configuration>
                    <source>1.6</source>
                    <target>1.6</target>
                    <encoding>UTF-8</encoding>
                 </configuration>
            </plugin>
        </plugins>
    </pluginManagement>
    
    <!-- 用于配置分发管理，配置相应的产品发布信息，主要用于发布，在执行mvn deploy后表示发布的位置 -->
    <distributionManagement>
    <repository>
      <id>nexus-releases</id>
      <name>Nexus Release Repository</name>
      <url>http://xxx.xx.xx.xx:port/content/repositories/releases/</url>
    </repository>
    <snapshotRepository>
      <id>nexus-snapshots</id>
      <name>Nexus Snapshot Repository</name>
      <url>http://xxx.xx.xx.xx:port/content/repositories/snapshots/</url>
    </snapshotRepository>
  </distributionManagement>
  
  
  Maven Repository  setting.xml:
  
    <!-- 配置本地仓库 -->
    <localRepository>/Users/allen/Project/res/repository</localRepository>
    <!-- 插件组，用于配置插件 -->
    <pluginGroups>
    
    </pluginGroups>

    <!-- 镜像--->
	<mirrors>
		<mirror>
			<id>nexus</id>
			<mirrorOf>*</mirrorOf>
			<name>Nexus Mirror</name>
			<url>http://xxxx.xx.xx.xx:prot/content/groups/public</url>
		</mirror>
	</mirrors>

    <!-- -->
	<profiles>
		<profile>
			<id>nexus</id>
			<repositories>
				<repository>
					<id>nexus</id>
					<name>local private nexus</name>
					<url>http://xxx.xx.xx.xx:prot/content/groups/public</url>
					<releases>
						<enabled>true</enabled>
					</releases>
					<snapshots>
						<enabled>true</enabled>
					</snapshots>
				</repository>
			</repositories>
			<pluginRepositories>
				<pluginRepository>
					<id>nexus</id>
					<name>local private nexus</name>
					<url>http://xxx.xx.xx.xx:prot/content/groups/public</url>
					<releases>
						<enabled>true</enabled>
					</releases>
					<snapshots>
						<enabled>true</enabled>
					</snapshots>
				</pluginRepository>
			</pluginRepositories>
		</profile>
	</profiles>

    <!-- -->
	<servers>
		<server>
			<id>nexus-releases</id>
			<username>username</username>
			<password>password</password>
		</server>
		<server>
			<id>nexus-snapshots</id>
			<username>username</username>
			<password>password</password>
		</server>
	</servers>

    <!--  -->
	<activeProfiles>
		<activeProfile>nexus</activeProfile>
	</activeProfiles>
</settings>
简单属性：
    .localRepository:本地仓库路径。
    .interactiveModel:值为true/false,true表示Maven可以使用用户输入，默认true.
    .usePluginRegistry:值为true/false,true表示Maven使用plugin-regisetry.xml管理插件版本，默认false；
    .offline:值为true/false.true表示构建系统在离线模式下执行，默认为false
pluginGroups:
    每个pluginGroup元素都包含一个groupId,当在命令行中没有提供插件的groupId时，将会使用该列表。这个列表自动包含org.apache.maven.	    plugin和org.codehaus.mojo.
    <pluginGroups>
    	<pluginGroup>org.mortbay.jetty</pluginGroup>
    </pluginGroups>
servers:
   POM的repositories和distributionManagement元素为下载和部署定义的仓库。一些设置如果服务器的用户和密码不应该和pom.xml一起分发。这种类型的信息应该存在于构建服务器上得settings.xml文件中。
   <servers>
   	<server>
   		<id></id>
   		<username></username>
   		<password></password>
   		<privateKey></privateKey>
   		<passphrase></passphrase>
   		<filePermissions></filePermissons>
   		<directoryPermissions></directoryPermissions>
   		<configuration></configuration>
   	</server>
   </servers>
   id:服务器的Id，和repository/mirror中配置的id项匹配。
   username,password:服务器的认证信息
   privateKey,passphrase:指定一个路径到一个私有key(默认为${user.home/.ssh/id_dsa})和一个passphrase
   filePermissions,directoryPermissions:设置文件和文件夹访问权限，对应unix文件权限制，如664，后者775
   注意：如果你使用一个已经key登陆服务器，你必须忽略<password>项，否则，key将会被忽略。
Mirrors：
	<mirrors>
		<mirror>
			<id>dfsdfsd.com</id>
			<name>username</name>
			<url>http://xxxx.xxxx.xxx/dfsfds/</url>
			<mirrorOf>central</mirrorOf>
		</mirror>
	</mirrors>
  id,name:镜像的唯一标识和用户友好的名称
  url:镜像的url，用于代替原始仓库的url
  mirrorof:使用镜像的仓库的id，可以使用下面匹配属性：
  	------*:匹配所有仓库id；
  	------external:*:匹配所有仓库id，除了那些使用localhost或者基于仓库文件的仓库；
  	------多个仓库id之间用逗号分隔
  	-----!repol:表示匹配所有仓库，除了repol,
proxies:代理服务器设置
	<proxy>
		<id></id>
		<active></active>
		<protocol></protocol>
		<username></username>
		<password></password>
		<host></host>
		<port></port>
		<nonProxyHosts></nonProxyHosts>
	</proxy>
   id:可选，为代理服务器设置一个名称
   active:true/false,默认true
   protocol:代理服务器使用的协议类型
   username：用户名
   password:密码
   host：主机名，或者IP
   port：端口号
   nonProxyHosts:不使用代理服务器的主机类型，多个主机之间用"|"分割，可以使用通配符
profiles：
	这里的profile元素师pom.xml的profile元素的一个剪裁版本，它包含activation,repositories,pluginRepositories和properties元素。如果一个在settings中的profile是激活的，它的值将覆盖在一个POM或者profiles.xml文件中得任何相同id的profiles.

activeProfiles:
	<activeProfiles>
		<activeProfile>env-test</activeProfile>
	</activeProfiles?
        activeProfile中间定义activeProfile的id，在这里定义的activeProfile总是被激活，不关心环境设置，如果配置的id的profile没有发现，将没有任何事发生。

pluginRepositories:
	插件仓库，仓库是俩种主要构件的家，第一种构件用于其他构件的依赖。这是中央仓库存储大部分构件类型。另一种构件类型是插件。maven插件是一种特殊类型的构件。由于这个原因，插件仓库独立于其他仓库。

